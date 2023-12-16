const express = require('express');

const app = express();

//init and middleware
app.listen(3000, ()=>{
    console.log("Server started at port 3000");
});

//routes
app.get("/books", (req, res)=>{
    res.json({mssg: "Welcome to BookVault"})
});