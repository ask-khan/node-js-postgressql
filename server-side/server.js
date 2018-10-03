// Library Declaration.
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dbClient = require(__dirname + '/db.js');

// Get Configuration Information.
const configuration = require(__dirname + '/config.js');

// Get Http Status.
const http = require(__dirname + '/http.js');

// Get Api message Response According To Api
const message = require(__dirname + '/response.js');

// Add Todo Controller Api.
const todo = require(__dirname + '/controllers/todo.js');

const app = express();

// Logging Middleware For Node.js. 
app.use(logger('dev'));

// Parse Cookie.
app.use(cookieParser());

// Parse Application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Set Access Controll Allow Origin.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Parse Application/json
app.use(bodyParser.json())

var todoControllerObject = new todo(app, dbClient, http, message);
// Add Todo.
todoControllerObject.addTodo(app, dbClient, http, message);
// Get Todo.
todoControllerObject.getTodo(app, dbClient, http, message);
// Edit Todo.
todoControllerObject.editTodo(app, dbClient, http, message);
// Delete Todo.
todoControllerObject.deleteTodo(app, dbClient, http, message);



app.listen(configuration.mode.PORT, () => console.log(`listening on port ${configuration.mode.PORT}!`))

module.exports = app;