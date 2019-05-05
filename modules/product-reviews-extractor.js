const cheerio = require('cheerio');
const productTools = require("./product-tools");

class ProductReviewsExtractor {

    constructor(pageScraper) {
        this.pageScraper = pageScraper;
    }

    async extract(epid, domain) {
        const self = this;
        const reviewsUrl = productTools.getReviewsUrl(domain, epid);
        const pageResponse = await self.pageScraper.scrape(reviewsUrl);
        console.log("Finished crawling " + reviewsUrl);
        const $ = cheerio.load(pageResponse.body);
        const output = [];
        $(".ebay-review-section").each(function () {
            const title = $(this).find("h3").text();
            const content = $(this).find("p.review-item-content").text();
            const rating = $(this).find("i.fullStar").length;
            let verifiedSection = $(this).find("p.review-attr .rvw-container span.rvw-val")[0];
            let verified = "";
            if (verifiedSection){
                verified = verifiedSection.childNodes[0].nodeValue;
            }
            output.push({
                title: title,
                content: content,
                rating: rating,
                verified: verified
            });
        });
        return output;
    }


}

module.exports = ProductReviewsExtractor;