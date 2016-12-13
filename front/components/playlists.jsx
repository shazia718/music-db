import React from 'react';
import $ from 'jquery';

var Playlists = React.createClass({
	getInitialState(){
		return {playlist: []}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/playlists',
			type: 'GET'
		}).done((data)=>{
			
			this.setState({playlist: data})
		})
	},
	render(){
		return(<div>
			<h1>Playlists</h1>
			{this.state.playlist.map(function(list,i){ 
				return(<li key={i}>{list.title}</li>)
			})}
			
		</div>)}
	})


export default Playlists

