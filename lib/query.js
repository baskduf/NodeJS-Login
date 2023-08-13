const mysql = require('mysql');

class Query {
    constructor() {
        this.connection = mysql.createConnection(
            {host: 'localhost', port: '3306', user: 'root', password: 'root', database: 'login_user'}
        );
        this
            .connection
            .connect();
    }

    createUser(name, id, password, callback) {
        let sql = `INSERT INTO user_table(name,id,password) VALUES('${name}','${id}','${password}')`;
        this.connection.query(sql, (err, result, filed) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            callback();
        });
    }

    endQuery() {
        this.connection.end();
    }

    loginUser(id, password, callback)
    {
        let sql = `SELECT * FROM user_table WHERE (id="${id}" AND password="${password}")`;
        this.connection.query(sql, (err, result, filed) => {
            if(err)
            {
                console.log(err);
            }
            callback(Object.keys(result).length);
        });
    }

    findUser(name, id, callback)
    {
        let sql = `SELECT * FROM user_table WHERE (name="${name}" OR id="${id}")`;
        this.connection.query(sql, (err, result, filed) => {
            if (err) {
                console.log(err);
            }
            //Object.keys(result).length
            callback(Object.keys(result).length);
        });
    }
};

module.exports = Query;