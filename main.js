const Apify = require('apify');
const RequestHandler = require("./modules/request-handler");
const PageScraper = require("./modules/page-scraper");
const pageScraper = new PageScraper();
const requestHandler = new RequestHandler(pageScraper);

Apify.main(async () => {
    const input = await Apify.getInput();
    console.log(`My test input: ${input.url}`);
    const output = await requestHandler.handle(input.url);
    await Apify.setValue('OUTPUT', output);
    console.log('Done.');
});
