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

    const transfer = async function (fromAccount, toAccount, amount) {

        try {
            await db.query('START TRANSACTION');

            const selectFromAccount = `SELECT balance
    FROM account
    WHERE account_number = ?`;

            const selectFromAccountResult = await db.query(selectFromAccount, fromAccount);

            const fromAccountBalance = selectFromAccountResult.balance;

            if (fromAccountBalance < amount) {
                throw new Error('You dont have enough money to transfer');
            }

            const updateFromAccount = `UPDATE account
    SET balance = balance - ?
    WHERE account_number = ?`;

            const updateToAccount = `UPDATE account
    SET balance = balance + ?
    WHERE account_number = ?`;

            const insertChanges = `INSERT INTO account_changes(account_number, amount, changed_date,remark)
    VALUES
    (?, ?, NOW(), 'Transfer to account number ${toAccount}'),
    (?, ?, NOW(), 'Transfer from account number ${fromAccount}')`;

            await db.query(updateFromAccount, [amount, fromAccount]);
            await db.query(updateToAccount, [amount, toAccount]);
            await db.query(insertChanges, [fromAccount, -amount, toAccount, amount]);
            await db.query('COMMIT');

            return 'Transfer completed successfully';
        } catch (err) {
            await db.query('ROLLBACK');
            throw err;
        } finally {
            db.end();
        }

    };

    transfer(101, 102, 1000).then((result) => {
        console.log(result);
    }).catch(err => console.log(err));

});