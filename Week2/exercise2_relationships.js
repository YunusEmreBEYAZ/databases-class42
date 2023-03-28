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

const researchPapersTable = "CREATE TABLE research_Papers(paper_id INT PRIMARY KEY, paper_title VARCHAR(255), conference VARCHAR(255), publish_date DATE)";

connection.query(researchPapersTable, (err, result) => {
    if (err) throw err;
    console.log(`research_Papers table created`);
});

// adding author_id to research_Paper table
const addAuthorIDtoResearchPapersTable = `ALTER TABLE research_Papers ADD author_id INT, ADD CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES authors(author_id)`;

connection.query(addAuthorIDtoResearchPapersTable, (err, result) => {
    if (err) throw err;
    console.log(`Author ID column added to research papers table.`);
});

// creating new table for relationship
const relationshipTable = `CREATE TABLE Authors_papers_relationship(author_id INT, paper_id INT,PRIMARY KEY(author_id, paper_id), CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES authors(author_id), CONSTRAINT fk_paper_id FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id))`;

connection.query(relationshipTable, (err, result) => {
    if (err) throw err;
    console.log(`Authors_papers_relationship table created.`);
});

const insertAuthors = `INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender) VALUES (1, 'John Smith', 'Harvard University', '1985-04-01', 10, 'M'), (2, 'Jane Doe', 'Harvard University', '1992-12-15', 8, 'F'), (3, 'David Lee', 'Harvard University', '1978-08-30', 12, 'M'), (4, 'Emily Chen', 'Harvard University, Berkeley', '1990-06-20', 6, 'F'), (5, 'Michael Johnson', 'Yale University', '1981-09-05', 14, 'M'),
(6, 'Alicia Rodriguez', 'Yale University', '1995-02-28', 7, 'F'),
(7, 'Kevin Brown', 'Yale University', '1982-11-18', 9, 'M'),
(8, 'Sophia Kim', 'Yale University', '1989-07-14', 11, 'F'),
(9, 'Daniel Wu', 'Cornell University', '1977-03-10', 15, 'M'),
(10, 'Linda Nguyen', 'Cornell University', '1991-12-25', 5, 'F'),
(11, 'Jason Lee', 'Cornell University', '1988-10-02', 13, 'M'),
(12, 'Maria Perez', 'Duke University', '1994-06-15', 7, 'F'),
(13, 'Samuel Kim', 'Duke University', '1983-04-20', 10, 'M'),
(14, 'Jessica Wang', 'Duke University', '1987-01-13', 8, 'F'),
(15, 'Ryan Chen', 'Duke University', '1980-08-12', 12, 'M')
`;

connection.query(insertAuthors, (err, result) => {
    if (err) throw err;
    console.log(`15 Authors added to authors table!`);
});

const insertPapers = `INSERT INTO research_papers(paper_title, conference, publish_date, author_id) VALUES 
('The Impact of Technology on Education', 'conference_5', '2011-08-30', 5),
('Artificial Intelligence and Its Applications', 'conference_3', '2012-08-30', 4),
('Blockchain Technology and Its Potential', 'conference_2', '2012-07-20', 1),
('The Role of Social Media in Modern Society', 'conference_1', '2010-07-20', 1),
('The Future of Virtual Reality', 'conference_2', '2010-01-20', 9),
('Green Energy Solutions for a Sustainable Future', 'conference_5', '2012-02-20', 4),
('The Benefits and Drawbacks of Online Shopping', 'conference_2', '2002-02-20', 11),
('The Psychology of Color in Marketing', 'conference_1', '2002-09-22', 12),
('Challenges and Opportunities in Digital Marketing', 'conference_3', '2012-05-22', 15),
('The Impact of Climate Change on Agriculture', 'conference_1', '2017-05-12', 2),
('Economic Growth and Development in Emerging Markets', 'conference_5', '2007-05-12', 3),
('The Ethics of Genetic Engineering', 'conference_1', '2016-06-15', 6),
('The Future of Space Exploration', 'conference_3', '2016-07-15', 7),
('The Psychology of Decision Making', 'conference_2', '2018-07-15', 8),
('The Rise of E-commerce and Its Impact on Retail', 'conference_5', '2018-01-11', 13),
('The Art and Science of Data Visualization', 'conference_4', '2011-01-11', 10),
('The Role of Artificial Intelligence in Healthcare', 'conference_3', '2012-11-11', 13),
('The History and Evolution of the Internet', 'conference_1', '2021-01-01', 14),
('The Future of Mobile Technology', 'conference_1', '2015-11-21', 1),
('The Importance of Emotional Intelligence in Leadership', 'conference_3', '2021-03-15', 15),
('The Impact of Social Media Influencers on Consumer Behavior', 'conference_5', '2014-03-14', 4),
('The Psychology of Addiction and Recovery', 'conference_1', '2012-02-11', 5),
('The Future of Work in the Digital Age', 'conference_4', '2013-04-11', 6),
('The Ethics of Big Data and Privacy', 'conference_1', '2019-09-19', 7),
('The Role of Blockchain Technology in Cybersecurity', 'conference_2', '2017-07-17', 8),
('The Psychology of Creativity', 'conference_4', '2005-02-11', 14),
('The Future of Renewable Energy', 'conference_5', '2018-01-11', 13),
('The Evolution of Transportation Technology', 'conference_1', '2001-05-05', 12),
('The Role of AI in the Future of Education', 'conference_3', '2009-01-25', 1),
('The Ethics of Autonomous Vehicles', 'conference_3', '2014-01-16', 1),
`;
connection.query(insertPapers, (err, result) => {
    if (err) throw err;
    console.log(`30 research papers added to table!`);
});