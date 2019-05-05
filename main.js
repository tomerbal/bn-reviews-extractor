const Apify = require('apify');
const RequestHandler = require("./modules/request-handler");
const PageScraper = require("./modules/page-scraper");
const ProductReviewsExtractor = require("./modules/product-reviews-extractor");
const pageScraper = new PageScraper();
const productReviewsExtractor = new ProductReviewsExtractor(pageScraper);
const requestHandler = new RequestHandler(pageScraper, productReviewsExtractor);

Apify.main(async () => {
    const input = await Apify.getInput();
    console.log(`My test input: ${input.url}`);
    const output = await requestHandler.handle(input.url, input.siteId);
    await Apify.setValue('OUTPUT', output);
    console.log('Done.');
});

process.on('uncaughtException', err => {
    if (err.name === 'AssertionError') {
        console.log("AssertionError");
    }
});
