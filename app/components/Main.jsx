
	var React = require('react');
	import Navigation from 'Navigation';
	
	var Main = (props) => {
		return (
				<div>
					<Navigation/>
						<div className="content-box">
							{props.children}
						</div>
				</div>
		);
	};

	module.exports = Main;