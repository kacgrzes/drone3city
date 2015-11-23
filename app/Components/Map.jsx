import React from 'react';
import { Card, CardTitle, CardText, CardActions, Button, FABButton, Icon } from 'react-mdl';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

require('./Map.css');

const coords = {
  lat: 54.5258541,
  lng: 18.53040660000006028
};

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
            			height={'620px'}
            			lat={coords.lat}
            			lng={coords.lng}
            			zoom={11}
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
    		          radius={10000}
    		          draggable={true}
    		          onDragEnd={this.onDragEnd}
    		          onClick={this.onClick} />
                  
                  <div className="on-map-actions">
                    <FABButton colored ripple>
                      <Icon name="flight_takeoff" />
                    </FABButton>
                  </div>

    		      </Gmaps>
            </Card>
  	}
}

export default Map;
 
