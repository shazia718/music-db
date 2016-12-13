const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Genre = require('./genre-model');
const Song = require('./song-model');

//////////
// YOUR CODE HERE:
//////////

var Playlist = sequelizeConnection.define('playlist',{
	title: {
		type: Sequelize.STRING,
		validate: {
			len: [1, 100]

		}

	}

});

Playlist.belongsToMany(Song, {through: 'playlist-song'})
Song.belongsToMany(Playlist, {through: 'playlist-song'})

module.exports = Playlist;
