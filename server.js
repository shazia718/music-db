const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Artist = require('./models/artist-model')
const Song = require('./models/song-model')
const Genre = require('./models/genre-model')
const Playlist = require('./models/playlist-model')
//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/front/bundle')));

//listen on port 8888
app.listen('9999', () => console.log('Listening on port 9999'));


//////////
// YOUR CODE HERE:
//////////

app.get('/api/artists', function(req, resp){
    Artist.findAll({ order: 'name'})
          .then(function(data){
              resp.send(data)
          })
});
app.get('/api/artists/:id', function(req, resp){
    Artist.findAll({
        where : {
            id: req.params.id
        }
    })
    .then(function(data){
        resp.send(data)
    })
})
app.post('/api/artists/', function(req, resp){
    Artist.create({ name: req.body.name })
    .then(function(){
        resp.send('Artist created')
    })
})
app.delete('/api/artists/:id', function(req, resp){
    Artist.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function(){
        resp.send('1 Record Deleted')
    })
})
app.put('/api/artists/:id/:newName', function(req, resp){
	Artist.update({
		name: req.params.newName
	},{
	where:  {
		id: req.params.id,
	}
	})
	.then(function(){
		resp.send('Artist updated')
	})
})

///api/songs GET all songs with genre and artist information fully populated (in other words, should say full artist name and genre names, instead of only having the ids)


app.get('/api/songs', function(req, resp){
	Song.findAll({
		include: [ Artist, Genre ]
	}).then(function(data){
		resp.send(data)
	})

})

// /api/songs/:id GET specific song by id
app.get('/api/songs/:id', function(req, resp){
	Song.findAll({
		where: {id: req.params.id}
	}).then(function(data){
		resp.send(data)
	})
})

// /api/songs POST (create) a new song
//#8 not finish
// app.post('/api/songs', function(req, resp){
//   Artist.findOrCreate({
//     where: {name: req.body.name}
//   }).then(function(artistId){
//     resp.send(artistId.dataValues.id)
//   }),
//   Genre.findOrCreate({
//     where: {title: req.body.genre}
//   }).then(function(genreId){
//     resp.send(genreId.dataValues.id)
//   }).then(
//   Song.create({title: req.body.title})
//   )
// })

app.post('/api/songs', function(req, resp){
  Artist.findOrCreate({
    where: {name: req.body.name}
  }).then((artist) => {
    Song.create({
      title: req.body.genre,
      youtube_url: req.body.url,
      ArtistId: artist[0].dataValues.id
    })
  }).then(
      Genre.findOrCreate({
      where: {title: req.body.genre}
    })
  ).then(
    (song) =>{
     song.addGenres([])
 })
})

    // resp.send(artistId.dataValues.id)
    // resp.send(genreId.dataValues.id)



//find and create artis by id, genre, song

// /api/songs/:id/:newTitle PUT (update) a specific song's title
app.put('/api/songs/:id/:newTitle', function(req, resp){
  Song.update({
    title: req.params.newTitle
  },{ where: {id: req.params.id}
}).then(function(data){
    resp.send(data)
  })
})

///api/songs/:id DELETE a specific song by id
app.delete('/api/songs/:id', function(req, resp){
  Song.destroy({
    where: {id: req.params.id}
  }).then(function(){
    resp.send('item deleted')
  })
})
// /api/playlists GET all playlists with song information fully populated (in other words, should say full song, artist, and genre names, instead of only having the ids)
app.get('/api/playlists', function(req, resp){
    Playlist.findAll({
        include: [
        {
            model: Song,
            include: [
            Artist, Genre
            ]
        }]
    })
    .then(function(data){
        resp.send(data)
    })
});





app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/index.html'));
});
