const express = require('express')
// const userRouter = require('')

const server = express()

server.use(express.json())

//need a user router here.
// server.use('/api/users', userRouter)

module.exports = server;