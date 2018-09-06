var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  fs.readFile(this.paths.list, 'utf8', (err, data)=>{

    callback(data.split('\n'));

  });
  
};

exports.isUrlInList = function(url, callback) {

  this.readListOfUrls(function(urls) {

    if (urls.indexOf(url) !== -1) {
      callback(true);
    } else {
      callback(false);
    }

  });

};

exports.addUrlToList = function(url, callback) {

  fs.appendFile(this.paths.list, url + '\n', (err)=>{
    if (err) {
      callback(err);
    } else {
      callback(true);
    }
  });

};

exports.isUrlArchived = function(url, callback) {

  fs.access(this.paths.archivedSites + '/' + url, (err)=>{
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {

  var that = this;

  urls.forEach(url => {

    request('http://' + url, (err, response, body)=>{
  
      if (err) {
        console.log('We have a problem: ', err);
      } else {
        fs.writeFileSync(that.paths.archivedSites + '/' + url, body);
      }
    });
  });
};
