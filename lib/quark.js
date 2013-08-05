var spawn = require('child_process').spawn;
var url = require('url');


var QUARK_PATH = '/home/jirwin/projects/atomnet/quarks/';

/**
 * Quark object
 * @param {String} name Name of the quark.
 * @param {String} path Path the quark will live at.
 * @param {String} url Url the quark represents.
 * @constructor
 */
var Quark = function(name, path, url) {
  this._name = name;
  this._path = path;
  this._url = url;
};


Quark.prototype.build = function() {
  var self = this,
      destPath, wget, args, parsedUrl;

  destPath = QUARK_PATH + this._path;

  parsedUrl = url.parse(this._url);

  args = [
    "--wait", "5",
    "-m",
    "-x",
    "-k",
    "-P", destPath,
    parsedUrl.host + parsedUrl.pathname,
  ];

  wget = spawn('wget', args);

  wget.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  wget.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  wget.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
};


exports.Quark = Quark;
