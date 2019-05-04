class RequestHandler {

    constructor(pageScraper) {
        this.pageScraper = pageScraper;
    }

    handle(url) {
        const self = this;
        return self.pageScraper.scrape(url);
    }

}

module.exports = RequestHandler;