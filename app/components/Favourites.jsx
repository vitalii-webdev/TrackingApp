
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

				var favouritesList = this.props.favouritesArray.map((item) => {
					
					return (<FavouriteItem key={item.trackcode} barcode={item.trackcode} itemName={item.name} addedTime = {item.addedtime} lastCheckTime = {item.lastchecktime} status = {item.status} onDeleteItem = {this.handleDeleteItem.bind(this)} onRenameSubmit = {this.handleRenameSubmit.bind(this)} />);
				});


			return (
				<div className="clearfix">
					<h3> Избранное (сохраняется в браузере) </h3>
					<table className="favourites-list-table">
					<thead>
						<tr> <th>Name</th> <th>Last check date</th> <th>Status</th> <th>Delete</th> </tr>
					</thead>
					<tbody>
						{favouritesList}
					</tbody>
					</table>
				</div>
			);

		}
	}

