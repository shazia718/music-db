var React = require('react');
var ReactDOM = require('react-dom');

import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router';

var NavBar = React.createClass({
	render(){
		return (<div>
			<ul>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/Artists'>Artists</Link></li>
				<li><Link to='/Songs'>Songs</Link></li>
				<li><Link to='/Playlists'>Playlists</Link></li>
				<li><Link to='/Create-song'></Link></li>
			</ul>
			{this.props.children}
		</div>)
	}
})

export default NavBar;

