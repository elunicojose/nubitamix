const express = require("express");

const app = express();

const port = process.env.port || 3000;

app.get("/frutas", (req, res) => {
  async function getFrutas() {
    // get the client
    const mysql = require("mysql2/promise");
    // create the connection
    const connection = await mysql.createConnection({
      host: process.env.host || "localhost", //"aws.connect.psdb.cloud",
      port: 3306,
      database: "nubitamix",
      user: process.env.user || "root",
      password: process.env.password || "rootpass",
      ssl: {
        rejectUnauthorized: false,
      },
    });

    connection.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });

    // query database
    const [rows, fields] = await connection.execute("SELECT * FROM `frutas`");
    res.send(rows);
  }

  getFrutas();
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

module.exports = app;
