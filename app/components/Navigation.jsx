
	var React = require('react');
	var {Link, IndexLink} = require('react-router');

	var Navigation = () => {
		return (
			<div className="top-bar">
				<div className="top-bar-left">
					<ul className="menu">
						<li className="menu-text">
							Post Tracking Service:
						</li>
						<li>
							<IndexLink to="/" activeClassName="active-link">Ukrposhta</IndexLink>
						</li>
						<li>
							<Link to="/novaposhta" activeClassName="active-link">Nova Poshta</Link>
						</li>
					</ul>
				</div>
				<div className="top-bar-right">
					<ul className="menu">
						<li className="menu-text">
							Testing version
						</li>
					</ul>
				</div>
			</div>
		);
	};

	module.exports = Navigation;