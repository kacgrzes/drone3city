import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, Cell } from 'react-mdl';
import Navigation from './Components/Navigation.jsx';
import Logs from './Components/Logs.jsx';
import Map from './Components/Map/Map.jsx';

import ReactToastr from 'react-toastr';

var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

require('./App.css');
require('./animate.css');

class App extends React.Component {

    //CONSTRUCTOR
    constructor() {
      super();
      this.addAlert = this.addAlert.bind(this);
      this.takeOff = this.takeOff.bind(this);
    }

    //RENDER
    render() {
        return (
            <div style={{width: '100%', margin: 'auto'}}>
                <ToastContainer ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right" />
                <Grid>
                    <Cell col={4}>
                    	<Navigation 
                            onTakeOff={this.takeOff}></Navigation>
                    	<Logs></Logs>
                    </Cell>
                    <Cell col={8}>
                        <Map></Map>
                    </Cell>
                </Grid>

                <button onClick={this.takeOff}>GGininder</button>
            </div>
        );
    }

    //CUSTOM METHODS 
    addAlert (message) {
        this.refs.container.success(
          message.text,
          message.title, {
          timeOut: 3000,
          extendedTimeOut: 3000
        });
    }

    takeOff (message) {
        this.addAlert(message);
    }

}

ReactDOM.render(<App/>, document.getElementById('app'));