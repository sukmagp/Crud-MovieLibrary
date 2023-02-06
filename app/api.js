const express = require ('express')
const bodyParser = require ('body-parser')
const client = require ('./connection')

const app = express()

app.use(bodyParser.json())

app.listen(3003, () => {
    console.log('Server is running')
})


client.connect(err => {
    if(err){
        console.log(err.message)
    }else{
        console.log("connected")
    }
})

// ===== Read =====
app.get('/movies', (req, res) => {
    client.query(`Select * from movies`, (err, result) => {
        if(!err){
            res.send(result.rows)
        }else{
            res.send(err.message)
        }
    })
})

// ===== Create =====
app.post('/movies', (req, res) => {
    const { movie_name, description, actors, author } = req.body

    client.query((`insert into movies(movie_name, description, actors, author) values ('${movie_name}', '${description}', '${actors}', '${author}')`), (err, result) => {
        if(!err){
            res.send("Insert success")
        }else{
            res.send(err.message)
        }
    })
})

// ===== Update =====
app.put('/movies/:id', (req, res) => {
    const { movie_name, description, actors, author } = req.body

    client.query((`update movies set movie_name = '${movie_name}', description = '${description}', actors = '${actors}', author = '${author}' where id = '${req.params.id}'`), (err, result) => {
        if(!err){
            res.send("Update success")
        }else{
            res.send(err.message)
        }
    })
})

// ===== Delete =====
app.delete('/movies/:id', (req, res) => {
    client.query((`delete from movies where id = ${req.params.id}`), (err, result) => {
        if(!err){
            res.send("Delete success")
        }else{
            res.send(err.message)
        }
    })
})