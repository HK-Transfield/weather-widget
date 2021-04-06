/*
 * add to/edit the skeleton code as required, I recommend you follow the defined structure
 * to ensure you meet the requirements for object literals and constructor functions
 *
 */
 

/**
 * Constructor function for a WeatherWidget instance
 * 
 * @param {node} container_element The DOM element inside which the widget will place its UI.
 */
function WeatherWidget(container_element){
	
	// fixed array of towns with weather information
	const _TOWNS = [
		"Auckland", 
		"Christchurch", 
		"Dunedin", 
		"Gisborne", 
		"Hamilton", 
		"Invercargill", 
		"Nelson", 
		"Rotorua", 
		"Tauranga", 
		"Wellington"
	];
	
	// declare data properties of object 
	var _instance = this;
	var _container = container_element;

	_instance._id = _container.id;
	_instance._weatherObjs = [];

	// declare inner object literal to represent widget's UI
	var _weatherWidgetUI = {
		inputs: {
			radioSortTown: null,
			radioSortMaxTemp: null
		},
		labels: {
			labelSelect: null,
			labelSortBy: null,
			labelTown: null,
			labelMaxTemp: null
		},
		divs:{
			monitor: null,
			divList: null,
			divTitle: null,
			divToolbar: null,
		},
		selectTown: null,
		option: null,
	}

    /**
	 * Creates and configures the DOM elements for the UI.
	 * This will be explicitly called when the object is 
	 * created to make it visible.
	 * 
	 * @param {node} container_element The DOM element inside which the widget will place its UI.
	 */
	var _createUI = function(container_element) {
		/*--CREATE DIVS-- */
		// monitor contains all ui elements and will append to container element
		_weatherWidgetUI.divs.monitor = document.createElement('div');
		_weatherWidgetUI.divs.monitor.setAttribute('class', 'monitor');
		_weatherWidgetUI.divs.monitor.setAttribute('id', 'monitor-' + _instance._id);
		
		// div that will contain a label and select input
		_weatherWidgetUI.divs.divTitle = document.createElement('div');
		_weatherWidgetUI.divs.divTitle.setAttribute('class', 'title');

		// div that will display the weather lines
		_weatherWidgetUI.divs.divList = document.createElement('div');
		_weatherWidgetUI.divs.divList.setAttribute('class', 'section list');
		_weatherWidgetUI.divs.divList.setAttribute('id', 'list-id-' + _instance._id);
		
		// div that will contain radio buttons and labels
		_weatherWidgetUI.divs.divToolbar = document.createElement('div');
		_weatherWidgetUI.divs.divToolbar.setAttribute('class', 'toolbar');
		_weatherWidgetUI.divs.divToolbar.setAttribute('id', 'toolbar-' + _instance.id);

		/*--CREATE LABELS--*/
		// label for select town
		_weatherWidgetUI.labels.labelSelect = document.createElement('label');
		_weatherWidgetUI.labels.labelSelect.setAttribute('for', 'select-' + _instance._id);
		_weatherWidgetUI.labels.labelSelect.innerText = 'Select Town: ';
		
		// label for toolbar to sort
		_weatherWidgetUI.labels.labelSortBy = document.createElement('label');
		_weatherWidgetUI.labels.labelSortBy.innerText = 'Sort by';

		// label for sort town radio button
		_weatherWidgetUI.labels.labelTown = document.createElement('label');
		_weatherWidgetUI.labels.labelTown.setAttribute('for', 'town-' + _instance._id);
		_weatherWidgetUI.labels.labelTown.innerText = 'Town';
		
		// label for sort max temp radio button
		_weatherWidgetUI.labels.labelMaxTemp = document.createElement('label');
		_weatherWidgetUI.labels.labelMaxTemp.setAttribute('for', 'max-temp-' + _instance._id);
		_weatherWidgetUI.labels.labelMaxTemp.innerText = 'Max temp';


		/*--CREATE RADIO BUTTONS--*/
		// sort by town name radio button
		_weatherWidgetUI.inputs.radioSortTown = document.createElement('input');
		_weatherWidgetUI.inputs.radioSortTown.setAttribute('type', 'radio');
		_weatherWidgetUI.inputs.radioSortTown.setAttribute('value', 'town');
		_weatherWidgetUI.inputs.radioSortTown.setAttribute('id', 'town-' + _instance._id);
		_weatherWidgetUI.inputs.radioSortTown.setAttribute('name', 'sort-' + _instance._id);
		_weatherWidgetUI.inputs.radioSortTown.setAttribute('onClick', `_sort(_sortTown, '${_instance._id}')`);
		_weatherWidgetUI.inputs.radioSortTown.onclick  = function(){_instance._sort(_sortTown)};
		
		// sort by max temperature radio button
		_weatherWidgetUI.inputs.radioSortMaxTemp = document.createElement('input');
		_weatherWidgetUI.inputs.radioSortMaxTemp.setAttribute('type', 'radio');
		_weatherWidgetUI.inputs.radioSortMaxTemp.setAttribute('value', 'max-temp');
		_weatherWidgetUI.inputs.radioSortMaxTemp.setAttribute('id', 'max-temp-' + _instance._id);
		_weatherWidgetUI.inputs.radioSortMaxTemp.setAttribute('name', 'sort-' + _instance._id);
		//_weatherWidgetUI.inputs.radioSortMaxTemp.setAttribute('onClick', `_sort(_sortMaxTemp, '${_instance._id}')`);
		_weatherWidgetUI.inputs.radioSortMaxTemp.onclick  = function(){_instance._sort(_sortMaxTemp)};
		

		/*--APPEND ELEMMENTS TO TOOLBAR--*/
		_weatherWidgetUI.divs.divToolbar.appendChild(_weatherWidgetUI.labels.labelSortBy);

		// append sort town button and label
		_weatherWidgetUI.divs.divToolbar.appendChild(_weatherWidgetUI.inputs.radioSortTown);
		_weatherWidgetUI.divs.divToolbar.appendChild(_weatherWidgetUI.labels.labelTown);

		// append sort max temperature button and label
		_weatherWidgetUI.divs.divToolbar.appendChild(_weatherWidgetUI.inputs.radioSortMaxTemp);
		_weatherWidgetUI.divs.divToolbar.appendChild(_weatherWidgetUI.labels.labelMaxTemp);
		_weatherWidgetUI.divs.divToolbar.appendChild(_weatherWidgetUI.divs.divList);

		
		/*--CREATE DROPDOWN MENU--*/
		_weatherWidgetUI.selectTown = document.createElement('select');
		_weatherWidgetUI.selectTown.setAttribute('name', 'towns');
		_weatherWidgetUI.selectTown.setAttribute('id', 'select-' + _instance._id);
		_weatherWidgetUI.selectTown.onchange = function(){_instance._requestWeatherRow()};

		/*--CREATE OPTIONS--*/
		_weatherWidgetUI.option = document.createElement('option');
		_weatherWidgetUI.option.setAttribute('value', '');
		_weatherWidgetUI.option.innerText = '--View Towns--';

		_weatherWidgetUI.selectTown.appendChild(_weatherWidgetUI.option);
		
		// mpa through the array
		_TOWNS.map(town => {
			_weatherWidgetUI.option = document.createElement('option');
			_weatherWidgetUI.option.setAttribute('value', town);
			_weatherWidgetUI.option.innerText = town;

			_weatherWidgetUI.selectTown.appendChild(_weatherWidgetUI.option);
		});

		/*--APPEND ELEMENTS TO TITLE--*/
		_weatherWidgetUI.divs.divTitle.appendChild(_weatherWidgetUI.labels.labelSelect);
		_weatherWidgetUI.divs.divTitle.appendChild(_weatherWidgetUI.selectTown);

		/*--PUT IT ALL TOGETHER--*/
		_weatherWidgetUI.divs.monitor.appendChild(_weatherWidgetUI.divs.divTitle);
		_weatherWidgetUI.divs.monitor.appendChild(_weatherWidgetUI.divs.divToolbar);

		container_element.appendChild(_weatherWidgetUI.divs.monitor);
    }
	
	/* add any other methods required for the functionality to get weather data using AJAX
    your callback function should create an instance of the WeatherLine object to store and 
    display the information returned */

	/**
	 * Send an AJAX request to the server to get weather data.
	 * 
	 * @param {string} town The name of the town we want to get the weather data for.
	 */
	_instance._requestWeatherRow = () => {		
		// retrieve option selected from dropdown menu in WeatherWidget
		let select = document.getElementById('select-' + _instance._id);
    	let town = select.options[select.selectedIndex].value;
		
		if(town != '') {
			let url = 'getWeatherData.php?town=' + town; 

			fetch(url,{method: 'GET'})
				.then(response => response.json())
				.then(_processWeatherRow)
				.catch(error => {
					console.log('Something went wrong with the fetch operation :(', error);
			});
		} else {
			return;
		}
	}
	
	/**
	 * Callback function. Processes the JSON data received from the server.
	 * 
	 * @param {JSON} response The weather data in a JSON format
	 */
	var _processWeatherRow = (response) => {
		_instance._weatherObjs.push(response);	

		let btnTown = document.getElementById('town-' + _instance._id);
		let btnMaxTemp = document.getElementById('max-temp-' + _instance._id);

		if(btnTown.checked)
			_instance._sort(_sortTown)
			
		if(btnMaxTemp.checked)
			_instance._sort(_sortMaxTemp)
		
		if(!btnMaxTemp.checked && !btnMaxTemp.checked)
			_displayWeatherRow()
	} 


	/**
	 * Creates the DOM for each weather object in the array,
	 * which is appended to the list div. Initiates a new 
	 * WeatherLine object for each item in the array.
	 */
	 var _displayWeatherRow = () => {

		let list = document.getElementById('list-id-' + _instance._id);

		// reset list so we can use updated _weatherObjs array
		while(list.hasChildNodes()) {
			list.removeChild(list.lastChild);
		}

		_instance._weatherObjs.forEach(weatherObj => {
			let wl = new WeatherLine(weatherObj);
			list.appendChild(wl.getDOM());
		});
	}

	
    /**
	 * Sorts the _weatherObjs array by town name
	 * alphabetically. 
	 * 
	 * @param a current item in the array
	 * @param b next item in the array
	 * 
	 * @returns where to position the element in the array
	 */
    _sortTown = (a, b) => {
		if(a.Town > b.Town)
			return 1;
		if(a.Town < b.Town)
			return -1;
		return 0;
	}

	/**
	 * Sort the _weatherObjs based on max temperature,
	 * in ascending order.
	 * 
	 * @param a current item in the array
	 * @param b next item in the array
	 * 
	 * @returns where to position the element in the array
	 */
	_sortMaxTemp = (a, b) => {
		return a.MaxTemp-b.MaxTemp;
	}

	/**
	 * Sorts the weatherObjs array, based on the sort function passed into it.
	 * 
	 * @param {function} sortFunc The function that will either sort by town or maxTemp
	 */
	_instance._sort = function(sortFunc) {

		_instance._weatherObjs.sort(sortFunc);
		console.log(_instance._weatherObjs);
		_displayWeatherRow();
	}

	  	
	/*********************************************************
	* WeatherLine Object
	********************************************************/
	
	/**
	 * Constructor Function for the inner weatherLine object.
	 * 
	 * @param {object} weatherObj The object containing full weather data for a town 
	 */
	var WeatherLine = function(weatherObj){  //add any relevant parameters
		
		// declare data properties for object and UI
		let {
			ID: _id,
			Town: _town,
			CurrentTemp: _currentTemp,
			MinTemp: _minTemp,
			MaxTemp: _maxTemp,
			Conditions: _conditions,
			Outlook: _outlook
		} = weatherObj;
		let _DOM;

		// inner object literal representing UI
		let _weatherLineUI = {
			p: null,
			spanLabel: null,
			spanNumeric: null
		}

		/**
		 * Creates and configure DOM elements for UI
		 */
        var _createUI = () => {
			_weatherLineUI.p = document.createElement('p');

			_weatherLineUI.spanLabel = document.createElement('span');
			_weatherLineUI.spanLabel.setAttribute('class', 'section_label');
			_weatherLineUI.spanLabel.innerHTML = _town;

			_weatherLineUI.spanNumeric = document.createElement('span');
			_weatherLineUI.spanNumeric.setAttribute('class', 'numeric');
			//_weatherLineUI.spanNumeric.innerHTML = _minTemp + ' ' + _maxTemp;
			_weatherLineUI.spanNumeric.innerHTML = _maxTemp;

			_weatherLineUI.p.appendChild(_weatherLineUI.spanLabel);
			_weatherLineUI.p.appendChild(_weatherLineUI.spanNumeric);

			_DOM = _weatherLineUI.p;
		}
		
		//Add any remaining functions you need for the object, like setters and getters
        //You will need a getter function for the DOM element containing all of the ui
        //elements you create in _createUI so that the outer widget can add it to its
        //own ui 

		/*****GETTERS*****/
		
		this.getId = () => _id; 
		
		
		this.getTown = () => _town;
		
		
		this.getCurrentTemp = () => _currentTemp;
		
		
		this.getMinTemp = () => _minTemp;
		
		
		this.getMaxTemp = () => _maxTemp;
		

		this.getConditions = () => _conditions;
		
		
		this.getOutlook = () => _outlook;
		
		
		this.getDOM = () => _DOM;
		
		
		
		/*****SETTERS*****/

		this.setId = (val) => {
			this._id = val; 
		}

		this.setTown = (val) => {
			_town = val;
		}

		this.setCurrentTemp = (val) => {
			_currentTemp = val;
		}

		this.setMinTemp = (val) => {
			_minTemp = val;
		}

		this.setMaxTemp = (val) => {
			_maxTemp = val;
		}

		this.setConditions = (val) => {
			_conditions = val;
		}

		this.setOutlook = (val) => {
			_outlook = val;
		}


		// _createUI() method is called when the object is instantiated
		_createUI();
	 
  	};  // end of the constructor function for the WeatherLine object 
	

	 
	  //  _initialise method is called when a WeatherWidget object is instantiated
	_createUI(_container);
}	 