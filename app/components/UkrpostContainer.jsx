
	import React from 'react';

	import TrackSearch from 'TrackSearch';
	import TrackResult from 'TrackResult';

	export default class UkrpostContainer extends React.Component {
		constructor(props) {
			super(props);
			this.handleTrackSearch = this.handleTrackSearch.bind(this);
			this.getTrackInfo = this.getTrackInfo.bind(this);
			this.state = { currentTrackNum : {} };
		}

		handleTrackSearch (trackNum) {
			this.getTrackInfo(trackNum);
		}

		getTrackInfo(trackNum) {

			var url = 'http://services.ukrposhta.com/barcodestatistic/barcodestatistic.asmx?wsdl';

			var args = {
				GUID : "fcc8d9e1-b6f9-438f-9ac8-b67ab44391dd",
				barcode : trackNum,
				culture : "uk"
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
						currentTrackNum : getTrackInfoResult
					});
				}.bind(this),
				error: function(data) {
					var getTrackInfoResult = eval('(' + data + ')');
					console.log('getTrackInfoResult : ' + JSON.stringify(getTrackInfoResult));
					this.setState({
						currentTrackNum : getTrackInfoResult
					});
				}.bind(this)
			});
		}

		render() {

			return (<div>
						<TrackSearch onTrackSearch = {this.handleTrackSearch} />
						<TrackResult currentTrackNum = {this.state.currentTrackNum} />
					</div>);
		}
	}