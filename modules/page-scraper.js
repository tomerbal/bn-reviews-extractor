const request = require('requestretry');
const appConfig = require("../config/app-config");
require('https').globalAgent.maxSockets = 10;
require('http').globalAgent.maxSockets = 10;


class PageScraper {

    constructor() {
    }

    scrape(url) {
        const username = appConfig.proxy.username;
        const password = appConfig.proxy.password;
        const host = appConfig.proxy.host;
        const port = appConfig.proxy.port;
        const proxiedRequest = request.defaults({
            'proxy': 'http://' + username + ":" + password + "@" + host + ":" + port,
            "timeout": 120000
        });
        const options = {
            url: url,
            timeout: 180000,
            maxAttempts: 10,
            retryDelay: 5000,
            retryStrategy: myRetryStrategy
        };
        console.log("Crawling " + url);
        return proxiedRequest.get(options);
    }

}

function myRetryStrategy(err, response, body, options){
    const result = !!err || response.statusCode !== 200;
    if (result){
        console.warn("Error scraping");
    }
    return result;
}

module.exports = PageScraper;