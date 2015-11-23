import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, Cell } from 'react-mdl';
import Navigation from './Components/Navigation.jsx';
import Logs from './Components/Logs.jsx';
import Map from './Components/Map.jsx';

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
                    	<Navigation></Navigation>
                    	<Logs></Logs>
                    </Cell>
                    <Cell col={8}>
                        <Map></Map>
                    </Cell>
                </Grid>

                <button onClick={this.addAlert}>GGininder</button>
            </div>
        );
    }

    //CUSTOM METHODS 
    addAlert () {
        console.log(this);
        this.refs.container.success(
          "Welcome welcome welcome!!",
          "You are now home my friend. Welcome home my friend.", {
          timeOut: 3000,
          extendedTimeOut: 3000
        });
    }

}

ReactDOM.render(<App/>, document.getElementById('app'));