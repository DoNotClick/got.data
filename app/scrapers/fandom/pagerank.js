const MWBot = require('mwbot');
const cheerio = require('cheerio');

class PageRankScraper {

    constructor() {
        this.bot = new MWBot({
            apiUrl: FANDOM_API_URL
        });

        this.ranks = false;
        this.visited = [];
        this.pending = [];
    }

    async scrapePageRanks() {
        if(this.ranks) {
            return this.ranks;
        }

        this.ranks = {};

        // starting page
        await this.scrapePage('Game_of_Thrones_(TV_series)');

        // loop while pending pages exist
        while(this.pending.length !== 0) {
            await this.scrapePage(this.pending.pop());

            console.log('[FandomPagerankScraper] '.green + 'pending:', this.pending.length, '- visited:', this.visited.length);
        }

        return this.ranks;
    }

    async scrapePage(page) {
        if(this.visited.indexOf(page) >= 0) {
            return;
        }

        this.visited.push(page);

        console.log('[FandomPagerankScraper] '.green + 'scraping page', page);

        let data;

        try {
            data = await this.bot.request({
                action: 'parse',
                format: 'json',
                page: page
            });
        } catch(e) {
            return false;
        }

        const $ = cheerio.load(data['parse']['text']['*']);
        const self = this;

        $('a').each(function () {
            let link = $(this).attr('href');

            if(link === undefined) {
                return true;
            }

            // skip if is not an own wiki page
            if(link.search('\\?') >= 0 || link.search('\\#') >= 0 || link.search('\\:') >= 0) {
                return true;
            }

            // skip if it is not a wiki link
            if(!link.startsWith('/wiki/')) {
                return true;
            }

            let nextPage = decodeURIComponent(link.substring(6));

            if(nextPage.search('\\/') >= 0) {
                return true;
            }

            if(nextPage in self.ranks) {
                self.ranks[nextPage] += 1;
            } else {
                self.ranks[nextPage] = 1;
            }

            if(self.visited.indexOf(nextPage) >= 0 || self.pending.indexOf(nextPage) >= 0) {
                return true;
            }

            self.pending.push(nextPage);
        });


        return true;
    }
}

// sample pagerank output: https://pastebin.com/4QYTeA9a

module.exports = PageRankScraper;

