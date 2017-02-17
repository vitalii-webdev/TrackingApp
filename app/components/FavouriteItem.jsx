	
	import React from 'react';

	export default class FavouriteItem extends React.Component {

		constructor(props) {
			super(props);
		}

		handleClick (event) {
			event.preventDefault();
			this.props.onDeleteItem(this.props.barcode);
		}

		handleRenameSubmit(event) {
			event.preventDefault();
			var textInputVal = this.textInput.value;
			if (textInputVal.length > 0) {
				this.props.onRenameSubmit(this.props.barcode, this.textInput.value);
				textInputVal = '';
			}
		}

		render() {

			return (
				<div className="favourite-item">
					<span className="barcode"> {this.props.barcode} </span> 
					==> 
					<span className="item-name"> {this.props.itemName} </span>
					<form onSubmit={this.handleRenameSubmit.bind(this)} >
						<input type="text" className="favitem-rename-text" placeholder="Enter new name" ref={(input) => { this.textInput = input; }} />
						<input type="submit" className="favitem-rename-submit button" value="Rename" />
					</form>
					<button className="favitem-delete-button button" onClick={this.handleClick.bind(this)}> Delete </button>
				</div>
			);
		}
	}