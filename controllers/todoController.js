var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todojs');

// *** Establish a Todo model
var Todo = mongoose.model('Todo', {
  item: String
});

module.exports = function (app) {

  // A static welcome page (todo: to be implemented)
  app.get('/', function (req, res) {
    res.render('welcome');
  });

  // TodoJS Homepage
  app.get('/todo', function (req, res) {
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render('todo', {
        todos: data
      });
    });
  });

  // Add a Tasks via $.ajax (todo-list.js)
  app.post('/todo', urlencodedParser, function (req, res) {
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;

      res.json(data);
    });
  });

  // Delete a Task via $.ajax (todo-list.js)
  app.delete('/todo/:item', function (req, res) {
    Todo.find({
      item: req.params.item.replace(/\-/g, " ")
    }).remove(function (err, data) {
      if (err) throw err;

      res.json(data);
    });
  });

};
