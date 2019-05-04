const request = require('requestretry');
const appConfig = require("../config/app-config");

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
            retryDelay: 5000
        };
        console.log("Crawling " + url);
        return proxiedRequest.get(options);
    }

}

module.exports = PageScraper;