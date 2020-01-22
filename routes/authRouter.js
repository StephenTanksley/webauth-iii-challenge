const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const authorization = require('../middleware/authorization')
const userModel = require('./userModel')
const secrets = require('../config/secrets')

const router = express.Router()

router.post('/register', async (req, res, next) => {
    try {
        const saved = await userModel.add(req.body)

        res.status(201).json(saved)
    }
    catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body 
        const user = await userModel.findBy({username}).first()
        const passwordValid = await bcrypt.compare(password, user.password)

        if(user && passwordValid) {
            const token = jwt.sign({
                subject: user.id,
                username: user.username,
            }, secrets.jwt, {
                expiresIn: '7d'
            })

            res.status(200).json({
                message: `Welcome, ${user.username}!`,
                token: token,
            })
        } else {
            res.status(401).json({
                message: 'Invalid credentials',
            })
        }
    }
    catch (error) {
        next(error)
    }
})

router.get('/protected', authorization(), async(req, res, next) => {
    try {
        res.json({
            message: 'You are authorized',
            userId: req.userId,
        })
    }
    catch (error) {
        next(error)
    }
})

//Since a JWT is stateless, we can't use a change in state to log a user out.

module.exports = router