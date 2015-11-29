import React from 'react';
import { Card, CardTitle, CardText, CardActions, Button, FABButton, Icon, Spinner } from 'react-mdl';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import Battery from '../Battery/Battery.jsx';

require('./Map.css');

const coords = {
  lat: 54.5258541,
  lng: 18.53040660000006028
};

class Map extends React.Component {
    
    constructor() {
      super();
    }

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
      var lat = e.latLng.lat,
        lng = e.latLng.lng;

      var jqxhr = $.post( "http://localhost:9000/goto", 
        { 
          longtitude: lng(),
          lattitude: lat() 
        })
      .done(function(data){
        console.info('going to ...');
      })
      .fail(function() {
        console.warn('nope ...');
      });
  	}

  	render() {
		return 	<Card shadow={3} style={{width: 'auto', height: '100%'}}>
                <Gmaps
            			width={'100%'}
            			height={'620px'}
            			lat={coords.lat}
            			lng={coords.lng}
            			zoom={11}
            			loadingMessage={<Spinner />}
            			params={{v: '3.exp'}}
            			onMapCreated={this.onMapCreated}>

            		<Marker
    		          lat={this.props.flightParams.lattitude}
    		          lng={this.props.flightParams.longtitude}
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
                  <Battery></Battery>
                </div>

    		      </Gmaps>
            </Card>
  	}

}

export default Map;
 
