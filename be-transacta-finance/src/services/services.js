const db = require('../configs/database');
const res = require('express/lib/response');
const helper = require('../hash/hash');

async function userLogin (tr){
    const {username, password} = tr;
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    const result = await db.query(query);
    
    if(result.rowCount > 0){
        const user = result.rows[0];
        const comparePass = await helper.comparePassword(password, user.password);
        if(comparePass){
            return {
                message: 'Login successful',
                user
            }
        }else{
            return {
                message: 'Password is not correct'
            }
        }
    }
}

async function userRegister (tr){
    const {username, password, email} = tr;
    const pass = await helper.hashPassword(password);
    const query = `INSERT INTO users (username, password, email) VALUES ('${username}', '${pass}', '${email}')`;
    const result = await db.query(query);
    if(result.rowCount === 1){
        return {
            message: 'User Created'
        }
    }else{
        return{
            message: 'Error'
        } 
    }
}

async function getUser (user){
    if(user){
        const query = `SELECT * FROM users WHERE "user_id" = '${user.user_id}'`;
        const result = await db.query(query);
        if(result.rowCount === 1){
            return {
                message: 'User found',
                user : result.rows
            }
        }else{
            return {
                message: 'User not found'
            }
        }
    }else{
        return {
            message: 'User not found'
        }
    }
}

async function deleteUser (user){
    if(user){
        const query = `DELETE FROM users WHERE "user_id" = ${user.user_id}`;
        const result = await db.query(query);
        if(result.rowCount === 1){
            return {
                message: 'User deleted'
            }
        }
        else{
            return {
                message: 'User not found'
            }
        }
    }
    else{
        return {
            message: 'USer not logged in'
        }
    }
}

async function addWallet (tr, user){
    const {wallet_name, balance, currency} = tr;
    if(user){
        const query = `INSERT INTO wallet (user_id, wallet_name, balance, currency) 
        VALUES (${user.user_id}, '${wallet_name}', ${balance}, '${currency}')`;
        const result = await db.query(query);
        if(result.rowCount === 1){
            return {
                message: 'Wallet Added'
            }
        }else{
            return{
                message: 'Error'
            } 
        }
    }
    else{
        return {
            message: 'User not logged in'
        }
    }
}

async function showWallet (user){
    if(user){
        const query = `SELECT * FROM wallet WHERE wallet_id=${user.wallet_id}`;
        const result = await db.query(query);
        if(result.rowCount > 0){
            return {
                message: 'Wallet Found',
                showProperties : result.rows
            }
        }else{
            return{
                message: 'No wallet Found' 
            } 
        }
    }
    else{
        return {
            message: 'User not logged in'
        }
    }
}

async function updateWallet (tr, user){
    const {wallet_id, wallet_name, balance, currency} = tr;
    if(user){
        const query = `UPDATE wallet 
        SET wallet_name='${wallet_name}', balance=${balance}, currency='${currency}' WHERE wallet_id=${wallet_id} AND user_id= ${user.user_id}`;
        const result = await db.query(query);
        if(result.rowCount > 0){
            return {
                message: 'Wallet Updated'
            }
        }else{
            return{
                message: 'Error'
            } 
        }
    }
    else{
        return {
            message: 'User not logged in'
        }
    }
}

async function addTransactions(tr, user) {
    const { Amount, Description, Category } = tr;
    if (user) {
        try {
            await db.query('BEGIN');

            // Insert the transaction into transaction_history
            const query = `
                INSERT INTO transaction_history (user_id, wallet_id, Amount, Description, Category) 
                VALUES (${user.user_id}, ${user.wallet_id}, ${Amount}, '${Description}', '${Category}') RETURNING *`;
            const result = await db.query(query);
            
            if (result.rowCount !== 1) {
                await db.query('ROLLBACK');
                return { message: 'Error inserting transaction' };
            }
            
            // Fetch the transaction amount
            const transactionAmount = result.rows[0].amount;

            // Update the wallet balance based on the transaction amount
            const updateBalanceQuery = `
                UPDATE wallet 
                SET balance = balance + ${transactionAmount} 
                WHERE wallet_id = ${user.wallet_id}`;
            const updateBalanceResult = await db.query(updateBalanceQuery);
            if (updateBalanceResult.rowCount !== 1) {
                await db.query('ROLLBACK');
                return { message: 'Error updating wallet balance' };
            }

            // Fetch the updated wallet balance
            const fetchUpdatedBalanceQuery = `
                SELECT balance FROM wallet 
                WHERE wallet_id = ${user.wallet_id}`;
            const fetchUpdatedBalanceResult = await db.query(fetchUpdatedBalanceQuery);
            if (fetchUpdatedBalanceResult.rowCount !== 1) {
                await db.query('ROLLBACK');
                return { message: 'Error fetching updated wallet balance' };
            }
            const updatedBalance = fetchUpdatedBalanceResult.rows[0].balance;

            // Update the balance in the transaction_history table
            const updateTransactionQuery = `
                UPDATE transaction_history 
                SET balance = ${updatedBalance} 
                WHERE transaction_id = ${result.rows[0].transaction_id}`;
            await db.query(updateTransactionQuery);

            await db.query('COMMIT');
            return { message: 'Transaction Added' };
        } catch (error) {
            await db.query('ROLLBACK');
            return { message: error.message || 'Error occurred' };
        }
    } else {
        return { message: 'User not logged in' };
    }
}

async function showTransactions(user) {
    if (user) {
        const query = `SELECT * FROM transaction_history WHERE user_id=${user.user_id}`;
        const result = await db.query(query);
        if (result.rowCount > 0) {
            return {
                message: 'Transactions Found',
                showTransactions: result.rows
            };
        } else {
            return {
                message: 'No transactions Found'
            };
        }
    } else {
        return {
            message: 'User not logged in'
        };
    }
}


async function updateTransactions (pt, user){
    const {transaction_id, Nama, Harga, Status} = pt;
    if(user){
        const query = `UPDATE transactions 
        SET Nama='${Nama}', Harga=${Harga}, Status='${Status}' WHERE transaction_id=${transaction_id} AND user_id= ${user.user_id}`;
        const result = await db.query(query);
        if(result.rowCount > 0){
            return {
                message: 'Transaction Updated'
            }
        }else{
            return{
                message: 'Error'
            } 
        }
    }
    else{
        return {
            message: 'User not logged in'
        }
    }
}

async function addPayment (tr, user){
    const {Payment_type, Amount} = tr;
    if(user){
        const query = `INSERT INTO payment (user_id, wallet_id, Payment_type, Amount) 
        VALUES (${user.user_id}, ${user.wallet_id}, '${Payment_type}', ${Amount})`;
        const result = await db.query(query);
        if(result.rowCount === 1){
            return {
                message: 'Payment Added'
            }
        }else{
            return{
                message: 'Error'
            } 
        }
    }
    else{
        return {
            message: 'User not logged in'
        }
    }
}

module.exports = {
    userLogin,
    userRegister,
    getUser,
    deleteUser,
    addWallet,
    showWallet,
    addTransactions,
    showTransactions,
    updateWallet,
    updateTransactions,
    addPayment,
}