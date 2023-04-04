const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database...');


    db.query("CREATE DATABASE IF NOT EXISTS transactions", (err, result) => {
        if (err) throw err;
        console.log("transactions database created successfully");
    });

    db.query("USE transactions", (err) => {
        if (err) throw err;
    });

    const accountTable = `CREATE TABLE IF NOT EXISTS account (account_number INT NOT NULL, balance DECIMAL(7,2) NOT NULL, PRIMARY KEY (account_number))`;

    db.query(accountTable, (err, result) => {
        if (err) throw err;
        console.log("Table created with the name of account");
    });

    const accountChanges = `CREATE TABLE IF NOT EXISTS account_changes (change_number INT(11) NOT NULL AUTO_INCREMENT,
account_number INT NOT NULL,
amount DECIMAL(7,2) NOT NULL,
changed_date DATETIME NOT NULL,
remark TEXT,
PRIMARY KEY (change_number),
FOREIGN KEY (account_number) REFERENCES account(account_number))`;

    db.query(accountChanges, (err, result) => {
        if (err) throw err;
        console.log(`account_changes table created successfully`);
    });

    db.end();

});