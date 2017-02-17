
	import React from 'react';

	export default class TrackSearch extends React.Component {
		constructor(props) {
			super(props);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleLangChange = this.handleLangChange.bind(this);
		}

		handleLangChange(event) {
			var currentLang = this.langCheckBox.checked ? 'en' : 'uk';
			this.props.onLangChange(currentLang);
		}

		handleSubmit(event) {
			event.preventDefault();
			var trackNum = this.textInput.value;
			this.textInput.value = '';
			if (trackNum.length > 0) {
				this.props.onTrackSearch(trackNum);
			}
		}

		render () {
			return (
				<div className = "tracking-form-box">
					<form className="tracking-form" onSubmit = {this.handleSubmit} >
					<input type="text" placeholder="CA123456789UA" ref={(input) => {this.textInput = input;}} /> 
					<input className="button" type="submit" value="GET"/>
					<label><input type="checkbox" className = "lang-checkbox" id="lang-checkbox" ref = {(input) => {this.langCheckBox = input;}} onChange = {this.handleLangChange} />
					English</label>
					</form>
				</div>
			);
		}
	}