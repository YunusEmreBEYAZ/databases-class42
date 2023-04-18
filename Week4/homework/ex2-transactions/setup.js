require('dotenv').config();

const { MongoClient } = require('mongodb');


async function mainData() {
    const client = new MongoClient(process.env.MONGODB_URL);

    const accounts = [
        {
            account_number: 101,
            balance: 10000.00,
            account_changes: [
                {
                    change_number: 1,
                    amount: 10000.00,
                    changed_date: new Date(),
                    remark: 'Starting balance',
                },
            ],
        },
        {
            account_number: 102,
            balance: 5000.00,
            account_changes: [
                {
                    change_number: 1,
                    amount: 5000.00,
                    changed_date: new Date(),
                    remark: 'Starting balance',
                },
            ],
        }
    ]

    try {

        await client.connect();
        // calling the data cleaning function 
        await cleanData(client);
        // calling the inserting  data function
        await addData(client, accounts);
    } finally {

        await client.close();
    }


}

mainData().catch(console.error);

async function cleanData(client) {
    const result = await client.db("databaseWeek4").collection("transaction").deleteMany({});
    console.log(`${result.deletedCount} document(s) has been deleted`);
};

async function addData(client, accounts) {
    const result = await client.db('databaseWeek4').collection('transaction').insertMany(accounts);
    console.log(
        `${result.insertedCount} new account(s) created.`);
    console.log(result.insertedIds);
};

module.exports = { mainData }