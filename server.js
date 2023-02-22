const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require('cors');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

/* --- Parsing Middleware --- */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* --- Connection Pool --- */
const pool = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : '',
  database        : process.env.DB_NAME
});

/* --- Connect to DB --- */
pool.getConnection((err, connection) => {
  if(err) throw err; //not connected!
  console.log('Connected as ID ' + connection.threadId);
})

/* --- Router --- */
const userRoute = require("./routes/user.route");
app.use('/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server Runnig At Port : ${PORT}`);
});