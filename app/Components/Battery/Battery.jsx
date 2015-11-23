import React from 'react';
import { FABButton, Icon } from 'react-mdl';
require('./Battery.css');

class Battery extends React.Component {

    //CONSTRUCTOR
    constructor() {
      super();
      this.getBattery = this.getBattery.bind(this);
      this.state = {
      	battery : 1,
      	charging : false
      };
    }

    componentDidMount() {
     	console.log('exampleComponent mounted');
     	this.getBattery(); 
     	setInterval(this.getBattery, 2000);
 	}

    //RENDER
    render() {
    	var charging = this.state.charging ?
    		(<FABButton 
    			colored 
    			ripple
    			className="battery-item">
    			<Icon name="battery_charging_full"/>
			</FABButton>) : null;

    	return 	<div>
	    			<FABButton 
	    				colored 
	    				ripple 
	    				onClick={this.getBattery}
	    				className="battery-item">
	                  		{this.state.battery*100}
	                </FABButton>
	                {charging}
    			</div>

    }

    getBattery () {
    	var seft = this;

        navigator.getBattery().then(function(result) {
        	console.log(result);
        	seft.setState({battery: result.level, charging: result.charging});
        });
    }
}

export default Battery;
