	
	import React from 'react';
	import moment from 'moment';

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
				this.props.onRenameSubmit(this.props.barcode, textInputVal);
				this.textInput.value = '';
			}
		}

		render() {

			return (
				<tr className="favourite-item-row">
					<td className="favitem-title-td">
						<div className='fav-title'>{this.props.barcode}</div>
						<div className='fav-description'>Имя: {this.props.itemName}</div>
						<div className='fav-addedtime'> Добавлено: { moment.unix( this.props.addedTime ).format('DD-MM-YYYY HH:mm:ss') }</div>
						<form onSubmit={this.handleRenameSubmit.bind(this)} >
							<input type="text" className="favitem-rename-text" placeholder="Enter new name" ref={(input) => { this.textInput = input; }} />
							<input type="submit" className="favitem-rename-submit button" value="OK" />
						</form>
					</td>
					<td className="favitem-checktime-td">
						{ moment.unix( this.props.lastCheckTime ).format('DD-MM-YYYY HH:mm:ss') }
					</td>
					<td className="favitem-description-td">
						{ this.props.status }
					</td>
					<td className="favitem-delete-td">
						<button className="favitem-delete-button button" onClick={this.handleClick.bind(this)}> Delete </button>
					</td>
				</tr>
			);
		}
	}