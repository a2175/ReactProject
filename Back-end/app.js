var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser')

global.PORT = 3001;
global._ROOT = __dirname + "/";
global._APP = _ROOT + "application/";
global._ROUTES = _APP + "routes/";
global._CONFIG = _APP + "config/";

var lib = require(_CONFIG + "lib"); // custom global function

app = express();
app.use(express.static("build"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/favicon.ico', function(request, response) {
  response.sendStatus(404);
});

var callback = function(request, response) {
  var _url = qs.unescape(request.url);
  var pathname = url.parse(_url, true).pathname;
  var param = getParam(pathname);

  fs.readdir(_ROUTES, function(error, filelist) {
    if (filelist.includes(param.page_type + ".js")) {
      var route = require(_ROUTES + param.page_type);
      new route(request, response, param);
    } else {
      response.send('404 Not Found');
    }
  });
};

app.get('/api/*', callback);
app.post('/api/*', callback);
app.get("/*", (request, response) => {
  response.sendFile(_ROOT + "build/index.html");
});

app.listen(PORT, function() {
  console.log('server start!');
});
