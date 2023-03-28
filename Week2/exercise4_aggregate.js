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


//All research papers and the number of authors that wrote that paper.

connection.query(`SELECT rp.paper_title, COUNT(ra.author_id) as num_authors FROM research_papers rp LEFT JOIN research_authors ra ON rp.paper_id = ra.paper_id GROUP BY rp.paper_id;`, (err) => {
    if (err) throw err;
    console.log('Success');
});

// Sum of the research papers published by all female authors.
connection.query(`SELECT SUM(CASE WHEN authors.gender = 'F' THEN 1 ELSE 0 END) AS total_research_papers_female FROM authors JOIN research_papers ON authors.author_id = research_papers.author_id;`, (err) => {
    if (err) throw err;
    console.log('Papers of female authors selected.');
});

//Average of the h-index of all authors per university.
connection.query(`SELECT university, AVG(h_index) AS avg_of_h_index FROM authors GROUP BY university;`, (err) => {
    if (err) throw err;
    console.log('AVG calculated according to the universities.');
});

//Sum of the research papers of the authors per university.
connection.query(`SELECT authors.university, SUM(1) AS total_research_papers FROM authors LEFT JOIN research_Papers ON authors.author_id = research_Papers.author_id GROUP BY authors.university;`, (err) => {
    if (err) throw err;
    console.log('Calculated research papers by grouping the universities.');
});

// Minimum and maximum of the h-index of all authors per university.
connection.query(`SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index FROM authors GROUP BY university;`, (err) => {
    if (err) throw err;
    console.log('Per univesities min and max h_index selected');
});