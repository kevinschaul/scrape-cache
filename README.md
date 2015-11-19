# scrape-cache

Scrape web pages, storing pages locally to lessen repetitive network requests.

Uses [cheerio](https://github.com/cheeriojs/cheerio) for scraping.

## Installation

    git clone https://github.com/kevinschaul/scrape-cache
    npm install

## Usage

`scrape-cache` exposes one method: `scrape(url, scraper, callback)`.
Its parameters:

* **url** String

    The URL to scrape

* **scraper**($) Function

    A function that scrapes the HTML and returns data that will be
    passed to `callback`.

    The parameter `$` is a [cheerio](https://github.com/cheeriojs/cheerio)
    jQuery-like object with the HTML already loaded.

* **callback**(result) Function

    A function that does something with `result`.


### Full usage example

To scrape an H1:

    var scrapeCache = require('scrape-cache');

    var url = 'https://github.com/';

    var scrapeH1 = function($) {
        return $('h1').text();
    };

    scrapeCache.scrape(url, scraper, function(result) {
        console.log(result);
    });

