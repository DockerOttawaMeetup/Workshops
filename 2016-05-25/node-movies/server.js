var mongoose = require('mongoose')
var express = require('express')
var app = express()

var db = mongoose.connection

db.on('error', console.error)
db.once('open', function () {
  console.log('Connected to mongo')
})

var movieSchema = mongoose.Schema({
  title: String
})
var Movie = mongoose.model('Movie', movieSchema)

var movie1 = new Movie({ title: 'The Princess Bride' })
movie1.save((err, movie) => {
  if (err) {
    return console.error(err)
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/movies', (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) {
      res.send(500, err)
    } else {
      res.send(movies)
    }
  })
})

mongoose.connect(process.env.MONGO_URL || 'mongodb://mongo/test', err => {
  if (err) {
    console.log(err)
    process.exit()
  }
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
})
