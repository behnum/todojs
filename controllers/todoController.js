var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var data = [
  {item: 'Do Homework'},
  {item: 'Go Shopping'},
  {item: 'Eat Cake'}
];

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('welcome');
  });

  app.get('/todo', function(req, res) {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo', function(req, res) {

  });

};
