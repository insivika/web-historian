var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');


// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {

    if (req.url === '/') {

      res.writeHead(200, {'Content-type': 'text/html'});
  
      fs.createReadStream(archive.paths.siteAssets + '/index.html', 'utf8').pipe(res);

    } else if (req.url === '/styles.css') {

      res.writeHead(200, {'Content-type': 'text/css'});
  
      fs.createReadStream(archive.paths.siteAssets + '/styles.css', 'utf8').pipe(res);

    } else if (fs.existsSync(archive.paths.archivedSites + req.url)) {

      fs.createReadStream(archive.paths.archivedSites + req.url, 'utf8').pipe(res);
        
    } else {

      res.writeHead(404, {'Content-type': 'text/plain'});

      res.end('Page not found');
    }
      
  } else if (req.method === 'POST') {
  
    var buffer = '';

    req.on('data', (chunk)=>{

      buffer += chunk;

    }).on('end', () => {

      var fileUrl = buffer.split('=')[1];

      archive.isUrlArchived(fileUrl, function(answer) {
        
        if (answer) {

          // fetch and serve the html
          httpHelpers.serveArchivedSites(res, fileUrl, ()=>{});

        } else {

          // add to text file and serve loading.html
          archive.addUrlToList(fileUrl, () => {});

          httpHelpers.serveLoadingfile(res, () => []);

        }
      });
    });
    // if url does exist in database serve html from archive

  } else {

    res.writeHead(404, {'Content-type': 'text/css'});

    res.end('Page not found');
  }

 

};



// res.end(archive.paths.list);