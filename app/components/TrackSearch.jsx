
	import React from 'react';

	export default class TrackSearch extends React.Component {
		constructor(props) {
			super(props);
			this.handleClick = this.handleClick.bind(this);
		}

		handleClick(event) {
			event.preventDefault();
			var track = this.textInput.value;
			this.textInput.value = '';
			if (track.length > 0) {
				this.props.onTrackSearch(track);
			}
		}

		render () {
			return (<div>
					<input type="text" placeholder="Please input the track number..." ref={(input) => {this.textInput = input;}} /> 
					<input type="button" value="GET" onClick = {this.handleClick} />
					<input type="checkbox" ref = {(input) => {this.checkBox = input;}}/>
					</div>);
		}
	}