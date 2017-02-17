	
	import React from 'react';

	export default class TrackResult extends React.Component {
		constructor (props) {
			super(props);
		}



		render() {

			var currentTrackNum = this.props.currentTrackNum;
			var currentAppLang = this.props.currentAppLang;

			function renderResultBox() {

			if(currentAppLang === 'en') {
				return (
					<div className = "track-result-box">
					<span className='text-bolder'>Track No. : </span> {currentTrackNum.barcode} <br/>
					<span className='text-bolder'>Location : </span> {currentTrackNum.eventdescription}
					</div>
				);
			} else {
					return (
					<div className = "track-result-box">
					<span className='text-bolder'>Номер отслеживания : </span> {currentTrackNum.barcode} <br/>
					<span className='text-bolder'>Местоположение : </span> {currentTrackNum.eventdescription}
					</div>
				);
			}


			}


			return ( renderResultBox()	);
		}
	}