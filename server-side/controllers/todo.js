
/**
 * todo Constructor.
 * @param {app} Express Object. 
 * @param {dbClient} Database Object.
 * @param {http} Standard Api Status Code.
 * @param {message} Standard Message Object.
 * @return None
 */
function todo(app, dbClient, http, message) {
    this.app = app;
    this.dbClient = dbClient;
    this.http = http;
    this.message = message;
}

/**
 * addTodo Constructor.
 * @param {app} Express Object. 
 * @param {dbClient} Database Object.
 * @param {http} Standard Api Status Code.
 * @param {message} Standard Message Object.
 * @return None
 */
todo.prototype.addTodo = (app, dbClient, http, message) => {
    app.post('/addtodo', (req, apiresponse) => {
        if (req.body.addtodo && req.body.addtodo) {
            const text = 'INSERT INTO todolist(todo_value, date_created) VALUES($1, current_timestamp) RETURNING *';
            const value = [req.body.addtodo];
            dbClient.query(text, value, (err, res) => {
                if (err) {
                    let response = {};
                    response.message = message.TODO_DUPLICATE_ITEM;
                    response.data = err.stack;
                    response.status = http.BAD_REQUEST;

                    apiresponse.status(http.BAD_REQUEST).send(response);
                } else {
                    let response = {};
                    response.message = message.TODO_ADD_SUCESSFULLY;
                    response.data = res.rows[0];
                    response.status = http.OK;

                    apiresponse.status(http.OK).send(response);
                }
            });
        } else {
            let response = {};
            response.message = message.TODO_PARAMS_MISSING;
            response.status = http.BAD_REQUEST;
            apiresponse.status(http.BAD_REQUEST).send(response);
        }
    });
};

/**
 * getTodo Constructor.
 * @param {app} Express Object. 
 * @param {dbClient} Database Object.
 * @param {http} Standard Api Status Code.
 * @param {message} Standard Message Object.
 * @return None
 */
todo.prototype.getTodo = (app, dbClient, http, message) => {
    app.get('/gettodo', (req, apiresponse) => {
        const text = 'SELECT todo_id, todo_value from todolist';
        dbClient.query(text, (err, res) => {
            if (err) {
                let response = {};
                response.message = message.TODO_GET_NOT_SUCESSFULLY;
                response.data = err.stack;
                response.status = http.BAD_REQUEST;

                apiresponse.status(http.BAD_REQUEST).send(response);
            } else {
                let response = {};
                response.message = message.TODO_GET_SUCESSFULLY;
                response.data = res.rows;
                response.status = http.OK;

                apiresponse.status(http.OK).send(response);
            }
        });
    });
};

/**
 * deleteTodo Constructor.
 * @param {app} Express Object. 
 * @param {dbClient} Database Object.
 * @param {http} Standard Api Status Code.
 * @param {message} Standard Message Object.
 * @return None
 */
todo.prototype.deleteTodo = (app, dbClient, http, message) => {
    app.get('/deletetodo/:todoid', (req, apiresponse) => {
        if (req.params.todoid && req.params.todoid) {
            const text = 'Delete from todolist where todo_id=$1 RETURNING *';
            const value = [req.params.todoid];
            dbClient.query(text, value, (err, res) => {
                if (err) {
                    let response = {};
                    response.message = message.TODO_DELETE_NOT_SUCESSFULLY;
                    response.data = err.stack;
                    response.status = http.BAD_REQUEST;

                    apiresponse.status(http.BAD_REQUEST).send(response);
                } else {
                    let response = {};
                    response.message = message.TODO_DELETE_SUCESSFULLY;
                    response.data = res.rows;
                    response.status = http.OK;

                    apiresponse.status(http.OK).send(response);
                }
            });
        } else {

            let response = {};
            response.message = message.TODO_DELETE_PARAMS_MISSING;
            response.data = "";
            response.status = http.BAD_REQUEST;

            apiresponse.status(http.BAD_REQUEST).send(response);
        }

    });
};

module.exports = todo;