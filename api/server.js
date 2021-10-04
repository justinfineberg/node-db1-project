const express = require("express");

const server = express();

server.use(express.json());
const AccountsRouter = require('./accounts/accounts-router')
server.use('/api/accounts', AccountsRouter)

server.use("*", (req,res)=>{
    res.status(404).json({
        message: "Error"
})
})

module.exports = server;
