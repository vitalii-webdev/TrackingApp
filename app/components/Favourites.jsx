
	import React from 'react';
	import FavouriteItem from 'FavouriteItem';

	export default class Favourites extends React.Component {
		constructor(props) {
			super(props);
		}

		handleDeleteItem (barcode) {
			this.props.onDeleteItem(barcode);
		}

		handleRenameSubmit(barcode, textInput) {
			this.props.onRenameSubmit(barcode, textInput);
		}

		render() {

				var favouritesList = [];

				for (let item of this.props.favouritesMap) {
					favouritesList.push(
					<FavouriteItem key={item[0]} barcode={item[0]} itemName={item[1]} onDeleteItem = {this.handleDeleteItem.bind(this)} onRenameSubmit = {this.handleRenameSubmit.bind(this)} />
					);
				}

			return (
				<div className="favourites-list-box">
					{favouritesList}
				</div> 
			);

		}
	}