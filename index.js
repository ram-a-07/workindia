const express = require("express");
const mysql = require("mysql");

const app = express();

const DB= {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "user"
};

const connection = mysql.createConnection({
    host: DB.HOST,
    user: DB.USER,
    password: DB.PASSWORD,
    database: DB.DB
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});


app.get("/", (req, res) => {
    res.json({ message: "Application" });
});

app.post("/create", (req,res)=>{
    var userid=req.body.name;
    var pwd=req.body.pwd;
    mysql.query(`INSERT INTO user (USERID,PASSWORD) VALUES (?,?)`, [userid, pwd], (err) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }
        res.json({message:"Created"})
    });
});

app.get("/search/:id",(req,res)=>{
    res.json({ message: "Search Route" });
})

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});