// operation to get information of all machines in database
const db = require('./database');

const getAllMachines = (callback) => {
    db.all("SELECT * FROM machines", [], (err, rows) => {
      callback(err, rows);
    });
  };

module.exports = getAllMachines