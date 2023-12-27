const express = require("express")

const app = express();

const port = process.env.port || 3000;

app.get("/frutas", (req, res) => {
    async function getFrutas() {
        // get the client
        const mysql = require('mysql2/promise');
        // create the connection
        const connection = await mysql.createConnection({host:'aws.connect.psdb.cloud', user: 'd6n4q619i1xfujyx69x1', database: 'nubitamix', 
         password: 'pscale_pw_Wcgadadc38W4rmkSHxW1HAUdhETL1ZJFyBxtDLdSpZP',
        ssl: {
            rejectUnauthorized: false
        }});
        // query database
        const [rows, fields] = await connection.execute('SELECT * FROM `frutas`');
        res.send(rows);
      }
    
      getFrutas();  
})

   app.listen(port, () => {
    console.log(`app running on port ${port}`)
  })


