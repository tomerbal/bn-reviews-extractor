const RequestHandler = require("./modules/request-handler");
const PageScraper = require("./modules/page-scraper");
const ProductReviewsExtractor = require("./modules/product-reviews-extractor");
const pageScraper = new PageScraper();
const productReviewsExtractor = new ProductReviewsExtractor(pageScraper);
const requestHandler = new RequestHandler(pageScraper, productReviewsExtractor);

const input = "https://www.ebay.co.uk/b/Narciso-Rodriguez-Womens-Fragrances/11848/bn_776014";
requestHandler.handle(input, 3)
    .then(function (output) {
        console.log(output);
    });


process.on('uncaughtException', err => {
    if (err.name === 'AssertionError') {
        console.log("AssertionError");
    }
});
