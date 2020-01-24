const bcrypt = require('bcryptjs')
const db = require('../data/dbConfig')

function find() {
    return db('users').select('id', 'username', 'department')
}

function findBy(filter) {
    return db('users')
    .where(filter)
    .select('id', 'username', 'password')
}

function findById(id) {
    return db('users')
        .where({ id })
        .first('id', 'username')
}

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)

    const [id] = await db('users')
        .insert(user)

    return findById(id)
}

module.exports = {
    add, 
    find, 
    findBy, 
    findById
}