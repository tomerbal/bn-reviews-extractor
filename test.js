const RequestHandler = require("./modules/request-handler");
const PageScraper = require("./modules/page-scraper");
const pageScraper = new PageScraper();
const requestHandler = new RequestHandler(pageScraper);

const input = "https://www.ebay.co.uk/b/Leather-Make-Up-Cases-and-Bags/36413/bn_1872678";
requestHandler.handle(input)
    .then(function (output) {
        console.log(output);
    });
