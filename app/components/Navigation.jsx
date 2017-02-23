
	var React = require('react');
	var {Link, IndexLink} = require('react-router');

	var Navigation = () => {
		return (
			<div className="header-box">
				<div className="header-box-inleft">
					<ul className="header-menu">
						<li className="header-menu-text">
							Post Tracking Service
						</li>
						<li>
							<IndexLink to="/" activeClassName="active-link">Ukrposhta</IndexLink>
						</li>
						<li>
							<Link to="/novaposhta" activeClassName="active-link">Nova Poshta</Link>
						</li>
					</ul>
				</div>
				<div className="header-box-inright">
					<ul className="header-menu">
						<li className="header-menu-text">
							
						</li>
					</ul>
				</div>
			</div>
		);
	};

	module.exports = Navigation;