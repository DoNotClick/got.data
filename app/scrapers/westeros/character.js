const MWBot = require('mwbot');
const cheerio = require('cheerio');

class CharacterScraper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: WESTEROS_API_URL
        });
    }

    async getAllNames() {
        let data = await this.bot.request({
            action: 'parse',
            page: 'List_of_characters',
            format: 'json'
        });

        let characters = [];
        //Iterate through all the Characters

        console.log('[WesterosCharacterScraper] '.green + 'Loading all character names from the wiki. This might take a while');

        let $ = cheerio.load(data.parse.text['*']);
        let allLis = $('li');

        let $name,
            name,
            slug;

        allLis.each(function () {
            $name = $(this).find('a').first();

            name = $name.attr('title').replace(/_/g, ' ');

            if(typeof $name.attr('href') !== 'string' || $name.attr('href').search('/index.php/')) {
                return true;
            }

            slug = $name.attr('href').replace('/index.php/', '');

            if(name.indexOf('House ') < 0) {
                characters.push({
                    'name': decodeURIComponent(name),
                    'slug': decodeURIComponent(slug)
                });
            }
        });

        console.log('[WesterosCharacterScraper] '.green + 'All character names loaded');

        return characters.filter(function (item, pos) {
            for(let i = 0; i < pos; i++) {
                if(characters[i]['slug'] === item['slug']) {
                    return false;
                }
            }

            return true;
        });
    }

    async getAll() {
        console.log('[WesterosCharacterScraper] '.green + 'fetching all character names from wiki');
        let characters = await this.getAllNames();

        let result = [];

        for(let i = 0; i < characters.length; i++) {
            console.log('[WesterosCharacterScraper] '.green + 'bulk scrape ( ' + (result.length + 1) + ' / ' + characters.length + ' )');

            try {
                result.push(await this.get(characters[i]['slug'], characters[i]['name']));
            } catch(e) {
                if(e.code === 'invalidjson') {
                    i -= 1;

                    continue;
                }

                console.warn('[WesterosCharacterScraper] '.green + e);
            }
        }

        return result;
    }

    async get(characterSlug, characterName) {
        if(!characterName) {
            console.log('[WesterosCharacterScraper] '.green + 'Skipped: ' + characterName);
            return;
        }

        console.log('[WesterosCharacterScraper] '.green + 'scraping ' + characterName);

        let data = await this.bot.request({
            action: 'parse',
            page: this.fixSlug(characterSlug),
            format: 'json'
        });

        let character = {};
        if(data) {
            character.name = characterName;
            character.slug = characterSlug.replace(/'/g, '_');

            // Fetch Gender
            if(data.parse.properties.length !== 0) {
                let firstAttempt = data.parse.properties[0]['*'];
                let gender = null;
                if(firstAttempt !== null) {
                    let phrases = firstAttempt.split('.');
                    if(phrases.length > 1) {
                        let phrase = phrases[1].trim();
                        if(phrase.indexOf('He') === 0 || phrase.indexOf('His') === 0) {
                            gender = 'male';
                        } else if(phrase.indexOf('She') === 0 || phrase.indexOf('Her') === 0) {
                            gender = 'female';
                        }
                    }
                }

                if(gender === null) {
                    let secondAttempt = data.parse.text['*'];
                    if(secondAttempt !== null) {
                        let fGender = (secondAttempt.match(/\sher\s|She|herself/g) || []).length;
                        let mGender = (secondAttempt.match(/\shis\s|\shim\s|He|himself/g) || []).length;
                        if(fGender > mGender) {
                            gender = 'female';
                        } else if(fGender < mGender) {
                            gender = 'male';
                        } else {
                            gender = null;
                        }
                    }
                }

                character.gender = gender;
            }

            //fetch the image
            let $ = cheerio.load(data.parse.text['*']);

            let imgLink = $('.infobox-image img').attr('src');
            if(imgLink !== undefined) {
                character.image = 'https://awoiaf.westeros.org' + imgLink;
            }

            let infobox = $('.infobox th');

            //fetch titles
            character.titles = [];

            let titleTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Title';
            }).parent().find('td');

            if(titleTd.html() !== null) {
                // get multiple titles
                let titles = titleTd.html().split('<br>');
                titles.forEach(function (title) {
                    // remove html tags and unnecessary spaces
                    title = title.replace(/\*?<(?:.|\n)*?>/gm, '').trim();

                    // remove references like [1]
                    title = title.replace(/\[\d+\]+/g, '');

                    title = title.replace(/&apos;/g, '\'');
                    title = title.replace(/&amp;/g, '&');

                    character.titles.push(title);
                });
            }


            //fetch books
            character.books = [];
            let booksTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Book(s)';
            }).parent().find('td');

            if(booksTd.html() !== null) {
                // get multiple titles
                let books = booksTd.html().split('<br>');
                books.forEach(function (book) {
                    // remove html tags and unnecessary spaces
                    book = book.replace(/\*?<(?:.|\n)*?>/gm, '').trim();

                    // remove references like [1]
                    book = book.replace(/\(\w+\)+/g, '').trim();

                    book = book.replace(/&apos;/g, '\'');
                    book = book.replace(/&amp;/g, '&');

                    character.books.push(book);
                });
            }

            // fetch culture
            let cultureTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Culture' || $(this).html() === '<span style="white-space:nowrap">Culture</span>';
            }).parent().find('td');

            if(cultureTd.html() != null) {

                let culture = cultureTd.html();
                culture = culture.replace(/<a\s(.*?)>/g, '').trim();
                culture = culture.replace(/<\/a>/g, '').trim();

                culture = culture.replace(/\(\w+\)+/g, '').trim();
                culture = culture.replace(/&apos;/g, '\'');
                culture = culture.replace(/&amp;/g, '&');

                character.culture = culture;
            }

            //fetch father
            let fatherTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Father' || $(this).html() === '<span style="white-space:nowrap">Father</span>';
            }).parent().find('td');

            if(fatherTd.html() != null) {

                let father = fatherTd.html().split('<br>');
                father[0] = father[0].replace(/<a\s(.*?)>/g, '').trim();
                father[0] = father[0].replace(/<\/a>/g, '').trim();

                father[0] = father[0].replace(/\(\w+\)+/g, '').trim();
                father[0] = father[0].replace(/&apos;/g, '\'');
                father[0] = father[0].replace(/&amp;/g, '&');

                character.father = father[0];
            }


            //fetch mother
            let motherTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Mother' || $(this).html() === '<span style="white-space:nowrap">Mother</span>';
            }).parent().find('td');

            if(motherTd.html() != null) {

                let mother = motherTd.html().split('<br>');
                mother[0] = mother[0].replace(/<a\s(.*?)>/g, '').trim();
                mother[0] = mother[0].replace(/<\/a>/g, '').trim();

                mother[0] = mother[0].replace(/\(\w+\)+/g, '').trim();
                mother[0] = mother[0].replace(/&apos;/g, '\'');
                mother[0] = mother[0].replace(/&amp;/g, '&');

                character.mother = mother[0];
            }

            // fetch heir
            let heirTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Heir' || $(this).html() === '<span style="white-space:nowrap">Heir</span>';
            }).parent().find('td');

            if(heirTd.html() != null) {

                let heir = heirTd.html();
                heir = heir.replace(/<a\s(.*?)>/g, '').trim();
                heir = heir.replace(/<\/a>/g, '').trim();

                heir = heir.replace(/\(\w+\)+/g, '').trim();
                heir = heir.replace(/&apos;/g, '\'');
                heir = heir.replace(/&amp;/g, '&');

                character.heir = heir;
            }

            // fetch spouse
            character.spouse = [];
            let spouseTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Spouse' || $(this).html() === 'Queen' || $(this).html() === 'Wife' || $(this).html() === 'Husband' || $(this).html() === 'King';
            }).parent().find('td');

            if(spouseTd.html() != null) {

                let spouses = spouseTd.html().split('<br>');

                spouses.forEach(function (spouse) {
                    // remove html tags and unnecessary spaces
                    spouse = spouse.replace(/\*?<(?:.|\n)*?>/gm, '').trim();

                    // remove references like [1]
                    spouse = spouse.replace(/\(\w+\)+/g, '').trim();

                    spouse = spouse.replace(/&apos;/g, '\'');
                    spouse = spouse.replace(/&amp;/g, '&');

                    character.spouse.push(spouse);
                });
            }

            //fetch children
            character.children = [];

            let childTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Issue';
            }).parent().find('td');

            if(childTd.html() !== null) {
                // get multiple titles
                let children = childTd.html().split('<br>');
                children.forEach(function (child) {
                    // remove html tags and unnecessary spaces
                    child = child.replace(/\*?<(?:.|\n)*?>/gm, '').trim();

                    // remove references like [1]
                    child = child.replace(/\[\d+\]+/g, '');

                    child = child.replace(/&apos;/g, '\'');
                    child = child.replace(/&amp;/g, '&');

                    character.children.push(child);
                });
            }

            //fetch allegiance
            character.allegiance = [];
            let allegianceTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Allegiance';
            }).parent().find('td');

            if(allegianceTd.html() !== null) {
                let allegiances = allegianceTd.html().split('<br>');

                let house = allegiances[0].replace(/\*?<(?:.|\n)*?>/gm, '').trim();
                house = house.replace(/\(\w+\)+/g, '').trim();
                character.house = house;

                allegiances.forEach(function (allegiance) {
                    allegiance = allegiance.replace(/\*?<(?:.|\n)*?>/gm, '').trim();

                    allegiance = allegiance.replace(/\(\w+\)+/g, '').trim();

                    allegiance = allegiance.replace(/&apos;/g, '\'');
                    allegiance = allegiance.replace(/&amp;/g, '&');

                    character.allegiance.push(allegiance);
                });
            }

            //fetch house
            let houseTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Royal House' || $(this).html() === '<span style="white-space:nowrap">Royal House</span>';
            }).parent().find('td');

            if(houseTd.html() != null) {

                let house = houseTd.html();
                house = house.replace(/<a\s(.*?)>/g, '').trim();
                house = house.replace(/<\/a>/g, '').trim();

                house = house.replace(/\(\w+\)+/g, '').trim();

                house = house.replace(/&apos;/g, '\'');
                house = house.replace(/&amp;/g, '&');

                character.house = house;
            }


            // fetch birthdate
            let bornTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Born' || $(this).html() === 'Born in';
            }).parent().find('td');

            if(bornTd.html() !== null) {
                let born = bornTd.html();

                let bornPlace = born.replace(/<[^>]*>/g, '');
                let checkBornAt = bornPlace.match(/at/g);

                if(checkBornAt != null) {
                    bornPlace = bornPlace.replace(/.*(?=at)/g, '');
                    bornPlace = bornPlace.replace(/\[.*?\]/g, '');
                    bornPlace = bornPlace.replace(/at&#xA0;/g, '');
                    bornPlace = bornPlace.replace(/at /g, '');
                    bornPlace = bornPlace.replace(/\n/g, '');
                    bornPlace = bornPlace.replace(/\(\w+\)+/g, '').trim();

                    bornPlace = bornPlace.replace(/&apos;/g, '\'');
                    bornPlace = bornPlace.replace(/&amp;/g, '&');
                    character.placeOfBirth = bornPlace;
                }


                let isBirthDate = false;
                if(born.indexOf('AC') > -1) {
                    let bornAC = born.match(/\d+ AC/);
                    if(bornAC !== null) {
                        born = bornAC[0].replace(/\D/g, '');
                    }
                    isBirthDate = true;
                }
                if(born.indexOf('BC') > -1) {
                    let bornBC = born.match(/\d+ BC/);
                    if(bornBC !== null) {
                        born = 0 - bornBC[0].replace(/\D/g, '');
                    }
                    isBirthDate = true;
                }
                if(isBirthDate) {
                    character.birth = born;
                }
            }

            // fetch death
            let diedTd = infobox.filter(function (i, el) {
                return $(this).html() === 'Died' || $(this).html() === 'Died in';
            }).parent().find('td');
            let isDead = false;

            if(diedTd.html() !== null) {
                let died = diedTd.html();

                let deathPlace = died.replace(/<[^>]*>/g, '');
                let checkDeathAt = deathPlace.match(/at/g);

                if(checkDeathAt != null) {
                    deathPlace = deathPlace.replace(/.*(?=at)/g, '');
                    deathPlace = deathPlace.replace(/\[.*?\]/g, '');
                    deathPlace = deathPlace.replace(/at&#xA0;/g, '');
                    deathPlace = deathPlace.replace(/at /g, '');
                    deathPlace = deathPlace.replace(/\n/g, '');
                    deathPlace = deathPlace.replace(/\(\w+\)+/g, '').trim();

                    deathPlace = deathPlace.replace(/&apos;/g, '\'');
                    deathPlace = deathPlace.replace(/&amp;/g, '&');
                    character.placeOfDeath = deathPlace;
                }

                if(died.indexOf('AC') > -1) {
                    let diedAC = died.match(/\d+ AC/);
                    if(diedAC !== null) {
                        died = diedAC[0].replace(/\D/g, '');
                    }
                    isDead = true;
                }

                if(died.indexOf('BC') > -1) {
                    let diedBC = died.match(/\d+ BC/);
                    if(diedBC !== null) {
                        died = 0 - diedBC[0].replace(/\D/g, '');
                    }
                    isDead = true;
                }

                if(isDead) {
                    character.death = died;
                }
            }

            character.alive = !isDead;
        }

        if(character.dateOfBirth && character.dateOfDeath) {
            character.age = parseInt(character.dateOfDeath) - parseInt(character.dateOfBirth);
        }

        if(character.dateOfBirth && !character.dateOfDeath) {
            character.age = 300 - parseInt(character.dateOfBirth);
        }

        return character;
    }

    fixSlug(characterSlug) {
        if(characterSlug === 'Brienne_of_Tarth') {
            return 'Brienne_Tarth';
        }

        return characterSlug;
    }
}

module.exports = CharacterScraper;