
	var React = require('react');
	import Navigation from 'Navigation';
	
	var Main = (props) => {
		return (
				<div>
					<Navigation/>
					<div className="row">
						<div className="columns medium-6 large-4 small-centered">
							{props.children}
						</div>
					</div>
				</div>
		);
	};

	module.exports = Main;