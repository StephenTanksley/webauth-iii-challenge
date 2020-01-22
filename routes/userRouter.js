const express = require('express')
const userModel = require('./userModel')

const router = express.Router()

router.get('/', /*authorization()*/ async (req, res, next) => {
    try {
        const users = await userModel.find()
        res.json(users)
    }
    catch (error) {
        next(error)
    }
})