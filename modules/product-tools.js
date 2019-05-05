module.exports = {
    getEpidFromHref: function (href) {
        const split = href.split("/");
        const last = split[split.length - 1];
        return last.substring(0, last.indexOf("?"));
    },
    getReviewsUrl: function (domain, epid) {
        return "https://www.ebay" + domain + "/urw/product-reviews/" + epid;
    }
};