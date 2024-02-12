// operation to add machines to database
const db = require('./database');

// New function to remove a machine by ID
const removeMachine = (id, callback) => {
    db.run("DELETE FROM machines WHERE id = ?", [id], function(err) {
      callback(err, this.changes); // this.changes returns the number of rows affected
    });
  };

module.exports = removeMachine