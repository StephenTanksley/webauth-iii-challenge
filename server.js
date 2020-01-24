const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())


//need a user router here.
server.use('/api/users', userRouter)
server.use('/api/auth', authRouter)


server.get("/", (req, res, next) => {
    res.json({
      message: "Welcome to our API",
    })
  })
  
  server.use((err, req, res, next) => {
    console.log("Error:", err)
  
    res.status(500).json({
      message: "Something went wrong",
    })
  })
  



module.exports = server;