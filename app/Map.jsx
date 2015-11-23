import React from 'react';
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

var image = require("file!./drone.jpg");

class Map extends React.Component {
	onMapCreated(map) {
    	map.setOptions({
      	disableDefaultUI: true
		});
  	}

  	onDragEnd(e) {
    	console.log('onDragEnd', e);
  	}

  	onCloseClick() {
    	console.log('onCloseClick');
  	}

  	onClick(e) {
    	console.log('onClick', e);
  	}


  	render() {
		return 	<Card shadow={3} style={{width: 'auto', height: '100%'}}>
                <Gmaps
        			width={'100%'}
        			height={'600px'}
        			lat={coords.lat}
        			lng={coords.lng}
        			zoom={12}
        			loadingMessage={'Be happy'}
        			params={{v: '3.exp'}}
        			onMapCreated={this.onMapCreated}>
        		<Marker
		          lat={coords.lat}
		          lng={coords.lng}
		          draggable={true}
		          onDragEnd={this.onDragEnd} />
		        <InfoWindow
		          lat={coords.lat}
		          lng={coords.lng}
		          content={'Hello, React :)'}
		          onCloseClick={this.onCloseClick} />
		        <Circle
		          lat={coords.lat}
		          lng={coords.lng}
		          radius={500}
		          onClick={this.onClick} />
		      </Gmaps>
            </Card>
  	}
}

export default Map;
 
