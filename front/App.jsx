import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router';

import NavBar from './components/nav-bar'
import Artists from './components/artists'
import Songs from './components/songs'
import Playlists from './components/playlists'

var App = React.createClass({
	render(){
		return (<div>
			<h1>MUSIC APP</h1>
			<NavBar />
			{this.props.children}
		</div>)
	}
})

var NotFound = React.createClass({
  render: function() {
    return (
      <h1>404, page not found</h1>
    )
  }
});

ReactDOM.render(
    <Router history={browserHistory}>
    	<Route path='/' component={App}>
	    <Route path='/artists' component={Artists} />
	    <Route path='/songs' component={Songs} />
 		<Route path='/playlists' component={Playlists} />
 		<Route path='*' component={NotFound} />
    	</Route>
    </Router>,
  document.getElementById('app')
  )

