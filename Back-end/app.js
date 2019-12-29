var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

global.PORT = 3002;
global._ROOT = __dirname + "/";
global._APP = _ROOT + "application/";
global._SERVICE = _APP + "service/";
global._DAO = _APP + "dao/";
global._ROUTES = _APP + "routes/";
global._CONFIG = _APP + "config/";

var lib = require(_CONFIG + "lib"); // custom global function

var app = express();
var server = http.createServer(app);
app.use(express.static(_ROOT + "build"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.get('/favicon.ico', function(request, response) {
  response.sendStatus(404);
});

var router = express.Router();
router.use('/board', require(_ROUTES + 'boardRoute'));
router.use('/comment', require(_ROUTES + 'commentRoute'));
router.use('/chat', require(_ROUTES + 'chatRoute')(server));
app.use('/api', router);

app.get("/*", (request, response) => {
  response.sendFile(_ROOT + "build/index.html");
});

server.listen(PORT, function() {
  console.log(`server listening on port ${PORT}`);
});
