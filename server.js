const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient

const uri = "mongodb+srv://alanhenri:X9j7M7vwSeIcHxiW@cluster0.dmn9q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
    if(err) return console.log(err)
    db = client.db ('Cluster0')

    
    app.listen(3000, function(){
     console.log('backend rodando na porta 3000')
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
})



