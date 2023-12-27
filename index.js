const express = require("express");

const app = express();

const port = process.env.port || 3000;

app.get("/frutas", (req, res) => {
  async function getFrutas() {
    // get the client
    const mysql = require("mysql2/promise");
    // create the connection
    const connection = await mysql.createConnection({
      host: "aws.connect.psdb.cloud",
      user: "4n4ir9hc80qkalkmqbxu",
      database: "nubitamix",
      password: "pscale_pw_KpkJ1gcLO7m9feNQq2uAnFkZwGjlXYNnM0PicpRDVb0",
      ssl: {
        rejectUnauthorized: false,
      },
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
