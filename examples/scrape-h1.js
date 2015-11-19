var scrapeCache = require('../src/index.js');

if (process.argv.length != 3) {
    process.stdout.write('USAGE: node scrape-url.js URL\n');
    return;
}

var url = process.argv[2];

var scrapeH1 = function($) {
    return $('h1').text();
};

scrapeCache.scrape(url, scrapeH1, function(result) {
    console.log(result);
});
