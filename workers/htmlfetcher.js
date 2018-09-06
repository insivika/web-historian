// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers');

// un-archived url collector
var getUrls = [];


// wakes up after 1 minute (using cron)
var htmlfetcher = function() {

  // received list of URLs
  archive.readListOfUrls(function(urls) {
    
    urls.forEach(function(url) {
      // collects the urls that need to be downloaded
      archive.isUrlArchived(url, function(isArchieved) {

        if (!isArchieved) {
          
          // runs the download helper function on each url 
          getUrls.push(url);
        }
        archive.downloadUrls(getUrls);
        
      });
    });
  });
};
htmlfetcher();
// goes to sleep