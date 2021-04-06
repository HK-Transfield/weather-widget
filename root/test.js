//First declare a constructor function for Name object

function Name(firstname, lastname){
    //properties - private
    var _first = firstname;
    var _last = lastname;
    
    //methods - public : Getters and Setters for data
	
	this.getFirstName = function() {
		return _first ;
	}
	
	this.getLastName = function()  {
		return _last ;
	}

	this.setFirstName = function(val) {
		_first = val;
	}
	this.setLastName = function(val)  {
		_last = val;
	}
}
// end of Name object declaration



function NameListWidget(page_element, initial_data){
    
    var _this_widget_instance = this;  //create a link to the object context
    var _container = page_element;
    var _addButton;

    var _data = new Array();
    
    //Declare constructor functions for the inner objects
    // DeleteButton and TextBox
    var DeleteButton = function(label, index, click_action){
        var _dom_element = document.createElement("input");
        _dom_element.type = "button";
        _dom_element.value = label;
        _dom_element.onclick = function(){
            click_action.call(null, index);
        
        };
        
		this.getDomElement = function() {
			return _dom_element;
		}
    }
       
    var TextBox = function(value, index, keyup_action){
        var _dom_element = document.createElement("input");
        _dom_element.type = "text";
        _dom_element.value = value;

        _dom_element.onblur = function(){
            keyup_action.call(null, index, _dom_element.value);
            
        };
		this.getDomElement = function() {
			return _dom_element;
		}
    }
    
    //when the object is instantiated add any data passed in from the
    //HTML file
    var _initialise = function(initial_data){
        
        for (var name of initial_data) {
            _data.push(name);
        }
        
    };
    
    //Construct the UI elements for each row of data displayed, which consists of
    // 2 text boxes and a delete button
    var _createListRow = function(index){
        
        var _para = document.createElement("p");
        var _first_name = new TextBox(_data[index].getFirstName(), index, _updateFirstName);
        var _last_name = new TextBox(_data[index].getLastName(), index, _updateLastName);
        var _del_button = new DeleteButton("-", index, _deleteName);
        
        _para.appendChild(_first_name.getDomElement());
        _para.appendChild(_last_name.getDomElement());
        _para.appendChild(_del_button.getDomElement());
        
        return _para;
    }
    
    //To refresh the page first remove all existing DOM elements and then 
    //construct the UI elements to display on the page that
    //instantiated the object by appending to the DOM subtree
    this.showNameList = function(){
        while (_container.hasChildNodes()) {
            _container.removeChild(_container.lastChild);
        }
        
        for (var i = 0; i < _data.length; i++) { 
            var list_row = _createListRow(i);
            _container.appendChild(list_row);
        }

        //For the lab exercise replace this with an object literal description
        _add_button = document.createElement("input");
        _add_button.type = "button";
        _add_button.value = "+";
        _add_button.onclick = _addName;
    
        _container.appendChild(_add_button);
        
    
    }

    
    var _addName = function(){
        _data.push(new Name("", ""));
        _this_widget_instance.showNameList();  //use the local context to call the method
     
    };
    
    var _deleteName = function(index){
        _data.splice(index, 1);
        _this_widget_instance.showNameList();  //use the local context to call the method
    };
    var _updateFirstName = function(index, value){
        _data[index].setFirstName(value);
       
    };
    var _updateLastName = function(index, value){
        _data[index].setLastName(value);
       
    };
    
    //each time we instantiate an object make sure we call
    //the _initialise function explicitly in order to display
    //the widget on the page
    _initialise(initial_data);
    
    //once the object has been created call the function that creates and displays
    //the ui
    _this_widget_instance.showNameList();  //use the local context to call the method
    
     
}
