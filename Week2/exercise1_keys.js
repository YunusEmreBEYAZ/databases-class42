const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database...');
});

connection.query("CREATE DATABASE IF NOT EXISTS week2", (err, result) => {
    if (err) throw err;
    console.log("week2 database created!");
});

connection.query("USE week2", (err) => {
    if (err) throw err;
});

const authorTable = "CREATE TABLE authors (author_id INT PRIMARY KEY, author_name VARCHAR(255), university VARCHAR(255), date_of_birth DATE, h_index INT,gender CHAR(1))";
connection.query(authorTable, (err, result) => {
    if (err) throw err;
    console.log('authors table created!');
});

const mentor = `
ALTER TABLE authors
ADD mentor INT,
ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id)
`;
connection.query(mentor, (err, result) => {
    if (err) throw err;
    console.log('Mentor column added to authors table!');
});



