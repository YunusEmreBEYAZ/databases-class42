require('dotenv').config();
const mainData = require('./setup.js');
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL);

async function main() {
    try {

        await transfer(client, 101, 102, 1000, "education")
    } finally {
        await client.close()
    }
}

main().catch(console.error);

async function transfer(client, fromAccountNumber, toAccountNumber, amount, remark) {
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            await client.connect();


            const fromAccount = await client.db("databaseWeek4").collection("transaction").findOne(
                {
                    account_number: fromAccountNumber,
                },
                { session }
            );
            const toAccount = await client.db("databaseWeek4").collection("transaction").findOne(
                {
                    account_number: toAccountNumber,
                },
                { session }
            );

            // Check if both accounts exist
            if (!fromAccount || !toAccount) {
                throw new Error("Please enter a valid account!");
            }

            // Check if fromAccount has enough balance
            if (fromAccount.balance < amount) {
                throw new Error("Insufficient balance");
            }

            const timestamp = new Date();

            // Update fromAccount
            const fromBalance = fromAccount.balance - amount;
            const fromChangeNumber = fromAccount.account_changes.length + 1;
            const fromChange = {
                change_number: fromChangeNumber,
                amount: -amount,
                changed_date: timestamp,
                remark: remark,
            };
            await client.db("databaseWeek4").collection("transaction").updateOne(
                { account_number: fromAccountNumber },
                {
                    $set: { balance: fromBalance },
                    $push: { account_changes: fromChange },
                },
                { session }
            );

            // Update toAccount
            const toBalance = toAccount.balance + amount;
            const toChangeNumber = toAccount.account_changes.length + 1;
            const toChange = {
                change_number: toChangeNumber,
                amount: amount,
                changed_date: timestamp,
                remark: remark,
            };
            await client.db("databaseWeek4").collection("transaction").updateOne(
                { account_number: toAccountNumber },
                {
                    $set: { balance: toBalance },
                    $push: { account_changes: toChange },
                },
                { session }
            );

            console.log(
                `Transferred ${amount} from account ${fromAccountNumber} to account ${toAccountNumber} successfully`
            );
        });
    } catch (err) {
        console.error(err);
    } finally {
        await session.endSession();
        await client.close();
    }
}
