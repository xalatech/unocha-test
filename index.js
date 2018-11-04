const package = require('./package.json');

const restify = require('restify');
const server = restify.createServer();

const models = require('./models');

// Models
models.init();

// Add basic restify middleware
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Routes
const home = require('./controllers/home');
const employee = require('./controllers/employee');
const team = require('./controllers/team');
const teamMember = require('./controllers/teamMember');

server.get('/', home.home);

server.get('/employee', employee.getAll);
server.get('/employee/:id', employee.get);
server.post('/employee', employee.create);
server.put('/employee/:id', employee.update);
server.del('/employee/:id', employee.remove);

// Team endpoints
server.get('/team', team.getAll);
server.get('/team/:id', team.get);
server.post('/team', team.create);
server.put('/team/:id', team.update);
server.del('/team/:id', team.remove);


// Team members endpoints
server.get('/teamMember', teamMember.getAll);
server.get('/teamMember/:id', teamMember.get);
server.post('/teamMember', teamMember.create);
server.del('/teamMember/:id', teamMember.remove);

server.listen(process.env.PORT || 4000, process.env.URL || '127.0.0.1', () => {
  console.log(`${package.name}@${package.version} listening at ${server.url}`);
});