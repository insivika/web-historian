var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveArchivedSites = function(res, asset, callback) {

  fs.readFile(archive.paths.archivedSites + '/' + asset, (err, data) =>{

    callback(data);

    res.writeHead(302, {'Content-type': 'text/html'});

    res.end(data);

  });

}; 

exports.serveLoadingfile = function(res, callback) {

  fs.readFile(archive.paths.siteAssets + '/loading.html', (err, data) => {

    callback(data);
    
    res.writeHead(302, {'Content-type': 'text/html'});
    
    res.end(data);
  
  });
};



// Write some code here that helps serve up your static files!
// (Static files are things like html (yours or archived from others...),
// css, or anything that doesn't change often.)


// As you progress, keep thinking about what helper functions you can put here!
