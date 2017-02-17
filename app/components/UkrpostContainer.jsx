
	import React from 'react';

	import TrackSearch from 'TrackSearch';
	import TrackResult from 'TrackResult';
	import FavouritesButton from 'FavouritesButton';
	import Favourites from 'Favourites';

	export default class UkrpostContainer extends React.Component {
		constructor(props) {
			super(props);
			this.handleTrackSearch = this.handleTrackSearch.bind(this);
			this.getTrackInfo = this.getTrackInfo.bind(this);
			this.handleLangChange = this.handleLangChange.bind(this);
			this.handleAddFavourites = this.handleAddFavourites.bind(this);
			this.state = { currentTrack : {}, currentAppLang : 'uk', favourites : new Map() };
		}

		handleLangChange(currentLang) {
			this.setState({
				currentAppLang: currentLang
			});
		}

		handleTrackSearch (trackNum) {
			this.getTrackInfo(trackNum, this.state.currentAppLang);
		}

		getTrackInfo(trackNum, culture) {

			var url = 'http://services.ukrposhta.com/barcodestatistic/barcodestatistic.asmx?wsdl';

			var args = {
				GUID : "fcc8d9e1-b6f9-438f-9ac8-b67ab44391dd",
				barcode : trackNum,
				culture : culture
			};

			$.ajax({
				type: "POST",
				crossDomain: true,
				url: "http://trackingapp/app/api/getTrackInfo.php",
				data: { ...args },
				success: function(data) {
					var getTrackInfoResult = eval('(' + data + ')');
					console.log('getTrackInfoResult : ' + JSON.stringify(getTrackInfoResult));
					this.setState({
						currentTrack : getTrackInfoResult
					});
				}.bind(this),
				error: function(data) {
					var getTrackInfoResult = eval('(' + data + ')');
					console.log('getTrackInfoResult : ' + JSON.stringify(getTrackInfoResult));
					this.setState({
						currentTrack : getTrackInfoResult
					});
				}.bind(this)
			});
		}

		handleAddFavourites () {
			var currentTrackCode = this.state.currentTrack.barcode;
			if (currentTrackCode.length > 0) {
				this.setState((prevState) => {
					var prevFavourites = prevState.favourites;
					if (prevFavourites.has(currentTrackCode)) {
						alert('Code is already in Favourites!');
						return { favourites: prevFavourites };
					} 
					prevFavourites.set(currentTrackCode, "customName");
					return { favourites: prevFavourites };
				}
				);
			}
			console.log(this.state.favourites);
		}

		handleRenameSubmit (barcode, textInput) {
			this.setState((prevState) => {
				var prevFavourites = prevState.favourites;
				prevFavourites.set(barcode, textInput);
				return { favourites: prevFavourites };
			});
		}

		handleDeleteItem (barcode) {
			this.setState((prevState) => {
				var prevFavourites = prevState.favourites;
				prevFavourites.delete(barcode);
				return {
					favourites: prevFavourites
				};
			});
		}

		render() {

			var isCurrentExists = (this.state.currentTrack.barcode && this.state.currentTrack.barcode.length > 0) ? true : false;

			return (<div className="ukrpost-container">
						<h2> Поиск почтовых отправлений "Укрпочты"</h2>
						<TrackSearch onTrackSearch = {this.handleTrackSearch} onLangChange = {this.handleLangChange} />
						<div className = "arrow-box"></div>
						<TrackResult currentTrackNum = {this.state.currentTrack} currentAppLang = {this.state.currentAppLang} />
						{ (isCurrentExists) ? (<FavouritesButton onAddFavourites = {this.handleAddFavourites} />) : false }
						<Favourites favouritesMap = {this.state.favourites} onDeleteItem = {this.handleDeleteItem.bind(this)} onRenameSubmit = {this.handleRenameSubmit.bind(this)} />
					</div>);
		}
	}