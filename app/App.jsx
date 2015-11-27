import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, Cell } from 'react-mdl';
import ReactToastr from 'react-toastr';

import Navigation from './Components/Navigation.jsx';
import Logs from './Components/Logs.jsx';
import Map from './Components/Map/Map.jsx';


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
      this.arming = this.arming.bind(this);
    }

    componentDidMount() {
        var self = this;
        var ws = new WebSocket("ws://localhost:9000/ws");
        ws.onopen = function (event) {
            self.addAlert({
                type: 'success',
                title: 'Sukces',
                text: 'Podłączono z WebSocket'
            });
        };
        ws.onmessage = function(event) {
            // console.log(event.data);
        }
        ws.onerror = function(event) {
            self.addAlert({
                type: 'error',
                title: 'Błąd',
                text: 'Nie udało się nawiązać połączenia' 
            })
        }
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
                            onTakeOff={this.takeOff}
                            onArming={this.arming}
                            ></Navigation>
                    	<Logs></Logs>
                    </Cell>
                    <Cell col={8}>
                        <Map></Map>
                    </Cell>
                </Grid>
            </div>
        );
    }

    //CUSTOM METHODS 
    addAlert (message) {
        this.refs.container[message.type](
          message.text,
          message.title, {
          timeOut: 3000,
          extendedTimeOut: 3000
        });
    }

    arming (message) {
        var self = this;

        var url = 'http://localhost:9000/arming';
        function onProgress(e) {
            var percentComplete = (e.position / e.totalSize)*100;
            console.info(percentComplete);
        }

        function onError(e) {
            console.warn('Error');
        }

        function onLoad(e) {
            self.addAlert(message);
        }

        var req = new XMLHttpRequest();
        req.onprogress = onProgress;
        req.open("GET", url, true);
        req.onload = onLoad;
        req.onerror = onError;
        req.send(null);
    }

    takeOff (message) {
        var self = this;

        var url = 'http://localhost:9000/takingoff';
        function onProgress(e) {
            var percentComplete = (e.position / e.totalSize)*100;
            console.info(percentComplete);
        }

        function onError(e) {
            console.warn(e);
        }

        function onLoad(e) {
            console.info(e);
            self.addAlert(message);
        }

        var req = new XMLHttpRequest();
        req.onprogress = onProgress;
        req.open("GET", url, true);
        req.onload = onLoad;
        req.onerror = onError;
        req.send(null);
    }


}

ReactDOM.render(<App/>, document.getElementById('app'));