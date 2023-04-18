


//for ex-1 using the .csv file in my mongodb i have imported data to my database with following code below
//mongoimport --uri mongodb+srv://databaseWeek4:<PASSWORD>@databaseweek4.yirlelc.mongodb.net/databaseWeek4 --collection populations --type csv --headerline --file population_pyramid_1950-2022.csv

const MongoClient = require('mongodb').MongoClient;

// for connection of .env file
require('dotenv').config();


async function main() {
    // calling of .env file
    const client = new MongoClient(process.env.MONGODB_URL);

    try {
        await client.connect();


        // ex-2
        // calling the function with a country name. We can call any country we want
        await countryPopulations(client, 'Afghanistan');



        // ex-3
        // calling the function for continent's information
        await continentInformation(client, 2020, "100+");
    } finally {
        await client.close();
    }

}

main().catch(console.error);


async function countryPopulations(client, country) {
    const pipeline = [
        {
            '$match': {
                'Country': country
            }
        }, {
            '$addFields': {
                '_id': '$Year',
                'population': {
                    '$sum': {
                        '$add': [
                            '$M', '$F'
                        ]
                    }
                }
            }
        }, {
            '$group': {
                '_id': '$Year',
                'totalPopulation': {
                    '$sum': '$population'
                }
            }
        }, {
            '$sort': {
                '_id': 1
            }
        }
    ];

    const cursor = client.db("databaseWeek4").collection("populations").aggregate(pipeline);

    await cursor.forEach(listing => {
        console.log(`_id: ${listing._id} countPopulation: ${listing.totalPopulation}`);

    });

};

async function continentInformation(client, year, age) {
    const pipeline = [
        {
            '$match': {
                'Year': year,
                'Age': age,
                '$or': [

                    {
                        'Country': 'ASIA'
                    }, {
                        'Country': 'EUROPE'
                    }, {
                        'Country': 'AFRICA'
                    }, {
                        'Country': 'NORTHERN AMERICA'
                    }, {
                        'Country': 'LATIN AMERICA AND THE CARIBBEAN'
                    }, {
                        'Country': 'OCEANIA'
                    }
                ]
            }
        }, {
            '$addFields': {
                'TotalPopulation': {
                    '$sum': {
                        '$add': [
                            '$M', '$F'
                        ]
                    }
                }
            }
        }, {
            '$sort': {
                'Country': 1
            }
        }
    ];

    const cursor = client.db("databaseWeek4").collection("populations").aggregate(pipeline);
    await cursor.forEach(listing => {
        console.log(`_id: ${listing._id} Country: ${listing.Country} Year: ${listing.Year} Age: ${listing.Age} M:${listing.M} F:${listing.F} TotalPopulation: ${listing.TotalPopulation}`);

    });
}