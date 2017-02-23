
	import React from 'react';
	import moment from 'moment';

	import {setToLocalStorage, getFromLocalStorage} from 'localStorageAPI';
	import TrackSearch from 'TrackSearch';
	import TrackResult from 'TrackResult';
	import UpdFavouritesButton from 'UpdFavouritesButton';
	import FavouritesButton from 'FavouritesButton';
	import Favourites from 'Favourites';

	export default class UkrpostContainer extends React.Component {
		constructor(props) {
			super(props);
			this.handleTrackSearch = this.handleTrackSearch.bind(this);
			this.getTrackInfo = this.getTrackInfo.bind(this);
			this.handleLangChange = this.handleLangChange.bind(this);
			this.handleUpdFavourites = this.handleUpdFavourites.bind(this);
			this.handleAddFavourites = this.handleAddFavourites.bind(this);
			this.state = { currentTrack : {}, currentAppLang : 'uk', favourites : getFromLocalStorage() };
		}

		componentDidUpdate () {
			setToLocalStorage(this.state.favourites);
		}

		handleLangChange(currentLang) {
			this.setState({
				currentAppLang: currentLang
			});
		}

		handleTrackSearch (trackNum) {
			this.getTrackInfo(trackNum, this.state.currentAppLang, (getTrackInfoResult) => {
				this.setState({
					currentTrack : getTrackInfoResult
				});
			});
		}


		getTrackInfo(trackNum, culture, callback) {

			var url = 'http://services.ukrposhta.com/barcodestatistic/barcodestatistic.asmx?wsdl';

			var args = {
				GUID : "fcc8d9e1-b6f9-438f-9ac8-b67ab44391dd",
				barcode : trackNum,
				culture : culture
			};

			$.ajax({
				type: "POST",
				cache: false,
				crossDomain: true,
				url: "http://trackingapp/app/api/getTrackInfo.php",
				data: { ...args },
				success: function(data) {
					var getTrackInfoResult = eval('(' + data + ')');
					console.log('Fetching track data goes well : ' + JSON.stringify(getTrackInfoResult));
					callback(getTrackInfoResult);
				},
				error: function(data) {
					var getTrackInfoResult = eval('(' + data + ')');
					console.log('Error in fetching track data : ' + JSON.stringify(getTrackInfoResult));
				}
			});
		}

		handleAddFavourites () {
			var currentTrackCode = this.state.currentTrack.barcode;
			var currentTrackDescr = this.state.currentTrack.eventdescription;
			if (currentTrackCode.length > 0) {
				this.setState((prevState) => {
					var prevFavourites = prevState.favourites;
					var isAlreadyExists = false;

					prevFavourites.map((item) => {
						if (item.trackcode === currentTrackCode) {
							isAlreadyExists = true;
						}
					});

					if (isAlreadyExists) {
						alert('Code is already in Favourites');
						return { favourites : prevFavourites };
					}

					var updFavourites = [...prevFavourites, { trackcode: currentTrackCode, name: '', addedtime: moment().unix(), lastchecktime: moment().unix(), status: currentTrackDescr }]; 
					return { favourites: updFavourites };
				}
				);
			}
			console.log(this.state.favourites);
		}

		handleUpdFavourites () {

			this.state.favourites.map((item) => {
				this.getTrackInfo(item.trackcode, this.state.currentAppLang, (getTrackInfoResult) => {
					this.setState((prevState) => {
						var prevFavourites = prevState.favourites;
						var updFavourites = prevFavourites.map((innerItem) => {
							if(innerItem.trackcode === getTrackInfoResult.barcode) {
								innerItem.lastchecktime = moment().unix();
								innerItem.status = getTrackInfoResult.eventdescription;
								
								console.log(innerItem.trackcode + ' - ' + new Date());
							}
							return innerItem;
						});

						return { favourites : updFavourites };
					});
				});
				return item;
			});

		}

		handleRenameSubmit (barcode, textInput) {
			this.setState((prevState) => {
				var prevFavourites = prevState.favourites;
				var updFavourites = prevFavourites.map((item) => {
					if (item.trackcode === barcode) {
						item.name = textInput;
					}

					return item;
				});
				return { favourites: updFavourites };
			});
		}

		handleDeleteItem (barcode) {
			this.setState((prevState) => {
				var prevFavourites = prevState.favourites;
				var updFavourites = prevFavourites.filter((item) => {
					if(item.trackcode === barcode) return false;
					return true;
				});
				return {
					favourites: updFavourites
				};
			});
		}

		render() {

			var isCurrentExists = (this.state.currentTrack.barcode && this.state.currentTrack.barcode.length > 0) ? true : false;
			var isFavouritesExist = (this.state.favourites.length > 0) ? true : false;

			return (<div className="ukrpost-container">
						<h2> Поиск почтовых отправлений "Укрпочты"</h2>
						<TrackSearch onTrackSearch = {this.handleTrackSearch} onLangChange = {this.handleLangChange} />
						<div className = "arrow-box"></div>
						<TrackResult currentTrackNum = {this.state.currentTrack} currentAppLang = {this.state.currentAppLang} />
						{ (isFavouritesExist) ? (<UpdFavouritesButton onUpdFavourites = {this.handleUpdFavourites} />) : false }
						{ (isCurrentExists) ? (<FavouritesButton onAddFavourites = {this.handleAddFavourites} />) : false }
						<Favourites favouritesArray = {this.state.favourites} onDeleteItem = {this.handleDeleteItem.bind(this)} onRenameSubmit = {this.handleRenameSubmit.bind(this)} />
					</div>);
		}
	}