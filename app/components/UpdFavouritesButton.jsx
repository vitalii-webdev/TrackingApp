
	import React from 'react';

	export default class UpdFavouritesButton extends React.Component {

		constructor(props) {
			super(props);
			this.handleUpdFavourites = this.handleUpdFavourites.bind(this);
		}

		handleUpdFavourites() {
			this.props.onUpdFavourites();
		}

		render() {
			return (
				<div className="upd-favourites-button"> 
					<button className="button" onClick= {this.handleUpdFavourites}>Update All Favourites</button> 
				</div>
			);
		}

	}