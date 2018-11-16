var restify = require('restify');
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', function (req, res, next) {
  res.send('hello world from restify');
  return next();
});

const user = require('./routes/users');
server.get('/users', user);

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});