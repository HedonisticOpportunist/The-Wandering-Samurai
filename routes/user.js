
/**
 * These are example routes for user management
 * This shows how to correctly structure your routes for the project
 */

const express = require("express");
const router = express.Router();
const assert = require('assert');

/**
 * @desc retrieves the current users
 */
router.get("/get-test-users", (req, res, next) => {

  //Use this pattern to retrieve data
  //NB. it's better NOT to use arrow functions for callbacks with this library
  global.db.all("SELECT * FROM testUsers", function (err, rows) {
    if (err) {
      next(err); //send the error on to the error handler
    } else {
      res.json(rows);
    }
  });
  
});

/**
 * @desc retrieves the current user records
 */
router.get("", (req, res, next) => {
  //USE this pattern to retrieve data
  //NB. it's better NOT to use arrow functions for callbacks with this library

  global.db.all("SELECT * FROM testUserRecords", function (err, rows) {
    if (err) {
      next(err); //send the error on to the error handler
    } else {
      res.json(rows);
    }
  });
});

/**
 * @desc Renders the page for creating a user record
 */
router.get("/create-user-record", (req, res) => {
  res.render("create-user-record");
});

/**
 * @desc Add a new user record to the database for user id = 1
 */
router.post("/create-user-record", (req, res, next) => {
  //USE this pattern to update and insert data
  //NB. it's better NOT to use arrow functions for callbacks with this library
  const data = generateRandomData(10);
  global.db.run(
    "INSERT INTO testUserRecords ('test_record_value', 'test_user_id') VALUES( ?, ? );",
    [data, 1],
    function (err) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        res.send(`New data inserted @ id ${this.lastID}!`);
        next();
      }
    }
  );
});

///////////////////////////////////////////// HELPERS ///////////////////////////////////////////

/**
 * @desc A helper function to generate a random string
 * @returns a random lorem ipsum string
 */
function generateRandomData(numWords = 5) {
  const str =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

  const words = str.split(" ");

  let output = "";

  for (let i = 0; i < numWords; i++) {
    output += choose(words);
    if (i < numWords - 1) {
      output += " ";
    }
  }

  return output;
}

/**
 * @desc choose and return an item from an array
 * @returns the item
 */
function choose(array) {
  assert(Array.isArray(array), "Not an array");
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

module.exports = router;