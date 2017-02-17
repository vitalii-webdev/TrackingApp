
	import React from 'react';

	export default class FavouritesButton extends React.Component {

		constructor(props) {
			super(props);
			this.handleClick = this.handleClick.bind(this);
		}

		handleClick() {
			this.props.onAddFavourites();
		}

		render() {
			return (
				<div className="favourites-button"> 
					<button className="button" onClick= {this.handleClick}>Add to Favourites</button> 
				</div>
			);
		}

	}