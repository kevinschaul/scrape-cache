var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var slug = require('slug');

module.exports = function() {
    var scrape = function(url, scraper, callback) {
        var opts = {
            cachePath: './scrape-cache/',
            slugifyFunction: slug
        };

        var cachedFilename = opts.cachePath + opts.slugifyFunction(url) + '.html';

        // Try to read from file
        try {
            var html = fs.readFileSync(cachedFilename, 'utf8');
            var result = _scrapeHTML(html, scraper);
            callback(result);
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

                    var result = _scrapeHTML(body, scraper);
                    callback(result);
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
