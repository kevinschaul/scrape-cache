var scrapeCache = require('../src/index.js');

if (process.argv.length != 3) {
    process.stdout.write('USAGE: node scrape-url.js URL\n');
    return;
}

var url = process.argv[2];

var h1 = scrapeCache.scrape(url, {}, function($) {
    return $('h1').text();
});
console.log(h1);
