// operation to add machines to database
const db = require('./database');

async function addMachine(productNumber, description) {
    try {
        return new Promise((resolve, reject) => {
            const insertSql = `INSERT INTO machines (productNumber, description) VALUES (?, ?)`;
            db.run(insertSql, [productNumber, description], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                    console.log(`New Machine (product: ${productNumber}) added`)
                }
            });
        });
    } catch (error) {
        throw error;
    }
}

module.exports = addMachine