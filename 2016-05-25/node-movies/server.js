var mongoose = require('mongoose')

var db = mongoose.connection

db.on('error', console.error)
db.once('open', function() {
    console.log('Connected to mongo')
});

mongoose.connect('mongodb://mongo/test')

var movieSchema = mongoose.Schema({
    title: String
})
var Movie = mongoose.model('Movie', movieSchema)

var movie1 = new Movie({ title: 'The Princess Bride' })
movie1.save(function (err, movie) {
    if (err) return console.error(err)
})
