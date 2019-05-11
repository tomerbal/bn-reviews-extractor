const cheerio = require('cheerio');
const productTools = require("./product-tools");
const appConfig = require("../config/app-config");

class RequestHandler {

    constructor(pageScraper, productReviewsExtractor) {
        this.pageScraper = pageScraper;
        this.productReviewsExtractor = productReviewsExtractor;
        this.reviewCount = 0;
        this.numberOfPages = 1;
    }

    async handle(url, siteId) {
        const self = this;
        const productsFound = {};
        const domain = self.getDomainBySiteId(parseInt(siteId));
        console.log("Domain: " + domain);
        let page = 1;
        let results;
        do {
            const urlToCrawl = url + "?_pgn=" + page;
            const pageResponse = await self.pageScraper.scrape(urlToCrawl);
            console.log("Finished crawling " + urlToCrawl);
            const $ = cheerio.load(pageResponse.body);
            if (page === 1) {
                self.setNumberOfPages($);
            }
            results = $(".s-item");
            results.each(function () {
                const hrefs = $(this).find('a');
                hrefs.each(function () {
                    const href = $(this).attr("href");
                    if (href.includes("/p/")) {
                        const epid = productTools.getEpidFromHref(href);
                        if (!productsFound.hasOwnProperty(epid) && self.reviewCount < appConfig.reviewsPerBn) {
                            self.productReviewsExtractor.extract(epid, domain)
                                .then(function (response) {
                                    self.reviewCount = self.reviewCount + response.length;
                                    productsFound[epid] = {
                                        epid: epid,
                                        reviews: response
                                    }
                                });
                        }
                    }
                });

            });
            page++;
        }
        while (results.length > 0 && page <= self.numberOfPages && self.reviewCount < appConfig.reviewsPerBn);
        return Object.values(productsFound);
    }

    getDomainBySiteId(siteId) {
        if (siteId === 0) {
            return ".com";
        }
        if (siteId === 101) {
            return ".it";
        }
        if (siteId === 77) {
            return ".de";
        }
        if (siteId === 15) {
            return ".com.au";
        }
        if (siteId === 3) {
            return ".co.uk";
        }
    }

    setNumberOfPages($) {
        const self = this;
        const itemsCountString = $(".srp-controls__count-heading").text();
        const numbers = itemsCountString.match(/\d+/g);
        self.numberOfPages = Math.ceil(parseInt(numbers[numbers.length - 1]) / appConfig.itemsPerBn);
    }

}

module.exports = RequestHandler;