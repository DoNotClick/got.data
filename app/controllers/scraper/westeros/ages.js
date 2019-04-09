const MWBot = require('mwbot');
const cheerio = require('cheerio');

class AgesScraper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: 'https://awoiaf.westeros.org/api.php'
        });
    }

    async getAll() {
        let ages = [];
        let data = await this.bot.request({
            action: "parse",
            page: "Timeline_of_major_events",
            format: "json"
        });

        let arrAge = data.parse.text["*"].match(/<span\sclass=\"tocnumber(.*?)>(.*?)<\/a>/g);
        for (let i = 1; i < arrAge.length - 2; i++) {
            let tmp = arrAge[i].match(/\">(.*?)<\/span>/g);
            let ageName = tmp[1].substring(2, tmp[1].length - 7);
            let age = {};
            age.name = ageName;
            ages.push(age);
        }
        for (let i = 0; i < ages.length; i++) {
            console.log('[WesterosAgeScraper] '.green + ages[i]);
            if (i > 0 && i < ages.length - 1) {
                ages[i].predecessor = ages[i - 1].name;
                ages[i].successor = ages[i + 1].name;
            }
            if (i === 0) {
                ages[i].successor = ages[i + 1].name;
            }
            if (i === ages.length - 1) {
                ages[i].predecessor = ages[i - 1].name;
            }
        }
        let arr = data.parse.text["*"].match(/<table\sclass=\"wikitable\">((.|[\r\n])*?)<\/table>/g);
        let start, end;
        for (let i = 0; i < arr.length; i++) {
            let q = arr[i].match(/<tr>\n<td(.*?)>((.|[\r\n])*?)<\/td>/g);
            if (q[0].indexOf("a>") !== -1) {
                if (q[0].indexOf("width") !== -1) {
                    q[0] = q[0].match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                    q[0] = q[0].substring(2, q[0].length);
                }
                let tmp = q[0].match(/\">((.|[\r\n])*?)<\/a>/g);
                start = tmp[0].substring(2, tmp[0].length - 4);

            } else {
                let tmp = q[0].match(/>((.|[\r\n])*?)</g);
                start = tmp[1].substring(1, tmp[1].length - 2);
            }

            if (q[q.length - 1].indexOf("a>") !== -1) {
                if (q[q.length - 1].indexOf("width") !== -1) {
                    q[q.length - 1] = q[q.length - 1].match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                    q[q.length - 1] = q[q.length - 1].substring(2, q[q.length - 1].length);
                }
                let tmp = q[q.length - 1].match(/">((.|[\r\n])*?)<\/a>/g);
                end = tmp[0].substring(2, tmp[0].length - 4);

            } else {
                let tmp = q[q.length - 1].match(/>((.|[\r\n])*?)</g);
                end = tmp[1].substring(1, tmp[1].length - 2);
            }

            ages[i].startDate = start;
            ages[i].endDate = end;
        }

        return ages;
    }

    async getAllWithEvents() {
        let ages = [];
        let index = 0;

        let data = await this.bot.request({
            action: "parse",
            page: "Timeline_of_major_events",
            format: "json"
        });

        let arrAge = data.parse.text["*"].match(/<span\sclass=\"tocnumber(.*?)>(.*?)<\/a>/g);
        for (let i = 1; i < arrAge.length - 2; i++) {
            let tmp = arrAge[i].match(/\">(.*?)<\/span>/g);
            let ageName = tmp[1].substring(2, tmp[1].length - 7);
            let age = {};
            age.name = ageName;
            ages.push(age);
        }
        for (let i = 0; i < ages.length; i++) {
            console.log('[WesterosAgeScraper] '.green + ages[i]);
            if (i > 0 && i < ages.length - 1) {
                ages[i].predecessor = ages[i - 1].name;
                ages[i].successor = ages[i + 1].name;
            }
            if (i === 0) {
                ages[i].successor = ages[i + 1].name;
            }
            if (i === ages.length - 1) {
                ages[i].predecessor = ages[i - 1].name;
            }
        }
        let arr = data.parse.text["*"].match(/<table\sclass=\"wikitable\">((.|[\r\n])*?)<\/table>/g);
        let start, end;
        for (let i = 0; i < arr.length; i++) {
            let q = arr[i].match(/<tr>\n<td(.*?)>((.|[\r\n])*?)<\/td>/g);
            if (q[0].indexOf("a>") !== -1) {
                if (q[0].indexOf("width") !== -1) {
                    q[0] = q[0].match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                    q[0] = q[0].substring(2, q[0].length);
                }
                let tmp = q[0].match(/\">((.|[\r\n])*?)<\/a>/g);
                start = tmp[0].substring(2, tmp[0].length - 4);

            } else {
                let tmp = q[0].match(/>((.|[\r\n])*?)</g);
                start = tmp[1].substring(1, tmp[1].length - 2);
            }

            if (q[q.length - 1].indexOf("a>") !== -1) {
                if (q[q.length - 1].indexOf("width") !== -1) {
                    q[q.length - 1] = q[q.length - 1].match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                    q[q.length - 1] = q[q.length - 1].substring(2, q[q.length - 1].length);
                }
                let tmp = q[q.length - 1].match(/\">((.|[\r\n])*?)<\/a>/g);
                end = tmp[0].substring(2, tmp[0].length - 4);

            } else {
                let tmp = q[q.length - 1].match(/>((.|[\r\n])*?)</g);
                end = tmp[1].substring(1, tmp[1].length - 2);
            }

            ages[i].startDate = start;
            ages[i].endDate = end;
        }

        for (let i = 0; i < arr.length; i++) {
            let lines = arr[i].match(/<tr>((.|[\r\n])*?)<\/tr>/g);
            let events = [];
            for (let j = 0; j < lines.length; j++) {

                let date;
                let event = {};
                let eventName;

                let nrOfCells = lines[j].match(/<td(.*?)>((.|[\r\n])*?)<\/td>/g);
                if (nrOfCells.length === 1) {
                    continue;
                }
                let title = lines[j].match(/<td(.*?)>((.|[\r\n])*?)<\/td>/g)[0];
                if (title.indexOf("a>") !== -1) {
                    if (title.indexOf("width") !== -1 || title.indexOf("rowspan") !== -1) {
                        title = title.match(/<a(.*?)">((.|[\r\n])*?)<\/a>/g)[0];
                        title = title.substring(2, title.length);
                    }
                    let tmp = title.match(/\">((.|[\r\n])*?)<\/a>/g);
                    date = tmp[0].substring(2, tmp[0].length - 4);
                } else {
                    let tmp = title.match(/>((.|[\r\n])*?)</g);
                    date = tmp[0].substring(1, tmp[0].length - 2);
                }

                //console.log(date);

                let content = lines[j].match(/<b>(.*?)<\/b>/g);
                if (content !== null) {
                    eventName = content[0].replace(/<a\shref(.*?)>/g, "");
                    eventName = eventName.replace(/<\/a>/g, "");
                    eventName = eventName.replace(/<b>/g, "");
                    eventName = eventName.replace(/<\/b>/g, "");
                } else {
                    eventName = "Unnamed" + index.toString();
                    index++;
                }
                event.name = eventName;

                if (date === "Prehistory") {
                    event.date = -15000;
                } else {
                    event.date = parseInt(String(date).replace("&#32;AC", ""));
                }

                events.push(event);

            }
            ages[i].events = events;
        }

        return ages;
    }
}

module.exports = AgesScraper;