const MWBot = require('mwbot');
const cheerio = require('cheerio');

class PageRankScraper {

    constructor() {
        this.bot = new MWBot({
            apiUrl: 'https://awoiaf.westeros.org/api.php'
        });

        this.ranks = false;
        this.visited = [];
        this.pending = [];

        // console.log(this.ranks)
    }

    async scrapePageRanks()
    {
        if(this.ranks)
        {
            return this.ranks;
        }

        this.ranks = {};

        // starting page
        await this.scrapePage("Main_Page");

        // loop while pending pages exist
        while(this.pending.length !== 0)
        {
            await this.scrapePage(this.pending.pop());

            console.log('[WesterosPagerankScraper] '.green + "pending:", this.pending.length, "- visited:", this.visited.length)
        }

        return this.ranks;
    }

    async scrapePage(page)
    {
        if(this.visited.indexOf(page) >= 0)
        {
            return;
        }

        this.visited.push(page);

        console.log('[WesterosPagerankScraper] '.green + "scraping page", page);

        let data;

        try {
            data = await this.bot.request({
                action: "parse",
                format: "json",
                page: page
            });
        }
        catch(e) {
            return false;
        }

        const $ = cheerio.load(data["parse"]["text"]["*"]);
        const self = this;

        $("a").each(function () {
            let link = $(this).attr("href");

            if(link === undefined)
            {
                return true;
            }

            // skip if is not an own wiki page
            if(link.search('\\?') >= 0 || link.search('\\#') >= 0 || link.search('\\:') >= 0)
            {
                return true;
            }

            // skip if it is not a wiki link
            if(!link.startsWith("/index.php/"))
            {
                return true;
            }

            let nextPage = decodeURIComponent(link.substring(11));

            if(nextPage.search('\\/') >= 0)
            {
                return true;
            }

            if(nextPage in self.ranks)
            {
                self.ranks[nextPage] += 1;
            }
            else
            {
                self.ranks[nextPage] = 1;
            }

            if(self.visited.indexOf(nextPage) >= 0 || self.pending.indexOf(nextPage) >= 0)
            {
                return true;
            }

            self.pending.push(nextPage);
        });
        // console.log('page: ' + page + ' rank: ' + this.ranks[page]);
        return true;
    }
}

// sample pagerank output: https://pastebin.com/4QYTeA9a

module.exports = PageRankScraper;

