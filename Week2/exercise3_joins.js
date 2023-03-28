const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week2'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database...');
});

connection.query("USE week2", (err) => {
    if (err) throw err;
});


// Write a query that prints names of all authors and their corresponding mentors.
connection.query(`SELECT a.author_name, m.author_name AS mentor_name FROM authors a LEFT JOIN authors m ON a.mentor = m.author_id;`, (err) => {
    if (err) throw err;
    console.log('All mentors selected...');
});


//Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
connection.query(`SELECT authors.author_id, authors.author_name, research_Papers.paper_title FROM authors LEFT JOIN research_Papers ON authors.author_id = research_Papers.author_id;`, (err) => {
    if (err) throw err;
    console.log('Authors and published papers selected.');
});