require("dotenv").config();
const mysql = require("mysql2/promise");
const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
const puerto = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Home!</h1>")
})

app.get("/frutas", (req, res) => {
  console.log("en local app get...");
  async function getFrutas() {
    console.log("en remote app get...");
    // Create the connection to database
    const connection = await mysql.createConnection({
      host: process.env.host || "http://localhost",
      port: 3306,
      database: "nubitamix",
      user: process.env.user || "root",
      password: process.env.password || "rootpass",
      ssl: {
        rejectUnauthorized: false,
      },
    });

    // A simple SELECT query
    try {
      const [result, fields] = await connection.query("SELECT * FROM `frutas`");
      console.log("resultado: ", result); // results contains rows returned by server
      res.set('Access-Control-Allow-Origin', '*');
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  }

  getFrutas();

  /*
  const result = {"data": [{"nombre":"aaax","costo":"1000","flete":"2000","total":"3000.00","id":1},{"nombre":"zzzz","costo":"5000","flete":"3000","total":"8000.00","id":2},{"nombre":"xxx","costo":"2333","flete":"4222","total":"6555.00","id":3},{"nombre":"yyy","costo":"43434","flete":"54545","total":"97979.00","id":4},{"nombre":"almendras","costo":"326","flete":"1254","total":"1580.00","id":5}]}
  const jsonResult = JSON.stringify(result);
  console.log('result: ', result)
  console.log('jsonResult: ', jsonResult)
  //res.send(jsonResult);
  res.json(result)
  */
});

app.listen(puerto, () => {
  console.log(`app running on port ${puerto}`);
});

module.exports = app;
