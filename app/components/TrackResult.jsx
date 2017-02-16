	
	import React from 'react';

	export default class TrackResult extends React.Component {
		constructor (props) {
			super(props);
		}

		render() {

			var currentTrackNum = this.props.currentTrackNum;

			return (
				<div className = "track-result-box"> 
					{currentTrackNum.eventdescription}
				</div>
			);
		}
	}