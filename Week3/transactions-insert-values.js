const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'transactions'
});

db.connect((err) => {
    if (err) throw err;

    db.query("USE transactions", (err) => {
        if (err) throw err;
    });

    const insertToAccount = `INSERT INTO account(account_number, balance)
VALUES
(101, 3000.00),
(102, 6000.00)`;

    db.query(insertToAccount, (err, result) => {
        if (err) throw err;
        console.log("New accounts inserted to database!");
    });

    db.end();
});