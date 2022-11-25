const express = require("express")
const mysql = require("mysql")
require('dotenv').config();

const db = mysql.createPool({
   host: process.env.HOST,       //This is your localhost IP
   user: process.env.USER,         // "newuser" created in Step 1(e)
   password: "",  // password for the new user
   database: process.env.DATABASE_MYSQL,      // Database name
//   port: "3306"             // port name, "3306" by default
})

db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

module.exports = db;
