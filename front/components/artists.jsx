import React from 'react';
import $ from 'jquery';

var Artists = React.createClass({
	getInitialState(){
		return {artist: []}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/artists',
			type: 'GET'
		}).done((data)=>{
			this.setState({artist: data})
		})
	},
	render(){
		return(<div>
			<h1>Artists</h1>
			{this.state.artist.map(function(a,i){ 
				return(<li key={i}>{a.name}</li>)
			})}
		</div>)
	}
})


export default Artists;

