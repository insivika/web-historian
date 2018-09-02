var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var helper = require('./http-helpers.js');



// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(function(req, res) {


  if (req.url === '/') {

    helper.serveAssets(res, __dirname + '/public/index.html', function(fileEnd) {
      return fileEnd.split('.')[1];
    });

  } else if (req.url === '/styles.css') {

    helper.serveAssets(res, __dirname + '/public/styles.css', function(fileEnd) {
      return fileEnd.split('.')[1];
    });

  }

   

  // handler.handleRequest(req, res)

});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

