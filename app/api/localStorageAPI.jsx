
	import $ from 'jquery';

	export var setToLocalStorage = function (itemsArr) {
		if ($.isArray(itemsArr)) {
			localStorage.setItem('itemsArr', JSON.stringify(itemsArr));
			return itemsArr;
		}
	};

	export var getFromLocalStorage = function () {
		var stringData = localStorage.getItem('itemsArr');
		var data = [];

		try {
			data = JSON.parse(stringData);
		} catch (err) {
			console.log('Error parsing localStorage data...');
		}

		return $.isArray(data) ? data : [];

	}