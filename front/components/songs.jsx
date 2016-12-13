import React from 'react';
import $ from 'jquery';

var Songs = React.createClass({
	getInitialState(){
		return {songs: []}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/songs',
			type: 'GET'
		}).done((data)=>{
			this.setState({songs: data})
	
		})
	},
	render(){
		return(<div>
			<h1>Songs:</h1>
			{this.state.songs.map(function(song, i){
				return(<li key={i}> {song.title} {song.artist.name}
				<iframe id="ytplayer" type="text/html" width="640" height="360"
				src={`${song.youtube_url.replace('watch?v=', 'embed/')}?origin=http://localhost:9999.com`}></iframe></li>)
			})}



		</div>)
	}
})

export default Songs; 