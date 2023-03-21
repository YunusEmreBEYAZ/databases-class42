import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "world"
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql');
});

// What are the names of countries with population greater than 8 million?
const countryNames = "SELECT Name FROM country WHERE population > 8000000";
db.query(countryNames, (err, result) => {
    if (err) throw err;
    console.log("Countries are selected which has greater than 8million population", result);
});

// What are the names of countries that have “land” in their names?

db.query('SELECT Name FROM country WHERE Name LIKE "%land%"', (err, result) => {
    if (err) throw err;
    console.log(`Selected countries which has 'land' in their name`, result);
});

// What are the names of the cities with population in between 500,000 and 1 million?
db.query('SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000',
    (err, result) => {
        if (err) throw err;
        console.log('Selected cities between population!', result)
    });

// What's the name of all the countries on the continent ‘Europe’?
db.query('SELECT name FROM country WHERE continent = "Europe"',
    (err, result) => {
        if (err) throw err;
        console.log('Selected EU countries', result);
    });

// List all the countries in the descending order of their surface areas.
db.query(
    'SELECT * FROM country ORDER BY SurfaceArea DESC',
    (err, result) => {
        if (err) throw err;
        console.log('Listed surfaced area by descending', result);
    });

// What are the names of all the cities in the Netherlands?
db.query(
    'SELECT name FROM city WHERE CountryCode = "NLD"',
    (err, result) => {
        if (err) throw err;
        console.log('All cities of Netherlands selected', result);
    });

// What is the population of Rotterdam?
db.query(`SELECT Population FROM city WHERE name = 'Rotterdam'`, (err, result) => {
    if (err) throw err;
    console.log('Population of Rotterdam selected', result);
});

// What's the top 10 countries by Surface Area?
db.query('SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10',
    (err, result) => {
        if (err) throw err;
        console.log('Selected top 10 countries which has biggest area', result);
    });

// What's the top 10 most populated cities?
db.query(
    'SELECT Name, population FROM city ORDER BY population DESC LIMIT 10',
    (err, result) => {
        if (err) throw err;
        console.log('Top 10 most populated cities', result);
    });

db.query('SELECT SUM(population) AS "Total Population" FROM country',
    (err, result) => {
        if (err) throw err;
        console.log('Population of the World calculated', result);
    });