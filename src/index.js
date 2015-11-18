var _ = require('underscore');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var slug = require('slug');

module.exports = function() {
    // TODO Fix api (userOpts should be optional)
    var scrape = function(url, userOpts, scraper) {
        var opts = _.extend({
            cachePath: './scrape-cache/',
            slugifyFunction: slug
        }, userOpts);

        var cachedFilename = opts.cachePath + opts.slugifyFunction(url) +
                '.html';

        // Try to read from file
        try {
            var html = fs.readFileSync(cachedFilename, 'utf8');
            return _scrapeHTML(html, scraper);
        } catch (e) {
            // If file does not yet exist, request it
            if (e.code === 'ENOENT') {
                request(url, function(err, response, body) {
                    // Save result to disk, then scrape
                    try {
                        fs.mkdirSync(opts.cachePath);
                    } catch (innerE) {
                        if (innerE.code !== 'EEXIST') {
                            throw innerE;
                        }
                    }
                    fs.writeFileSync(cachedFilename, body);

                    return _scrapeHTML(body, scraper);
                });
            } else {
                throw e;
            }
        }
    };

    var _scrapeHTML = function(html, scraper) {
        var $ = cheerio.load(html);
        return scraper($);
    };

    return {
        scrape: scrape
    };
}();
