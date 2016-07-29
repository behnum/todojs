var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Static files - use middlewares
app.use(express.static('./public'));

// Fire Controllers
todoController(app);

// Listen to port
app.listen(3000);
console.log('Now Listening to port 3000');