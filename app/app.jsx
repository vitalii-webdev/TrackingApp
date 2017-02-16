var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import Main from 'Main';
import NPContainer from 'NPContainer';
import UkrpostContainer from 'UkrpostContainer';

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<Route path="novaposhta" component={NPContainer} />
			<IndexRoute component={UkrpostContainer} />
		</Route>
	</Router>,
  document.getElementById('app')
);
