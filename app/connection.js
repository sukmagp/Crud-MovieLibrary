const { Client } = require ( 'pg' )

const client = new Client ({
    host: "localhost",
    user: "postgres",
    port: 9090,
    password: "Lokiju123",
    database: "movielibrary"
})

module.exports = client;