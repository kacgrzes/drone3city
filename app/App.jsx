import React from 'react';
import { Grid, Cell } from 'react-mdl';
import Navigation from './Navigation.jsx';
import Logs from './Logs.jsx';
import Map from './Map.jsx';

class App extends React.Component {

    render() {
        return (
            <div style={{width: '100%', margin: 'auto'}}>

                <Grid>
                    <Cell col={4}>
                    	<Navigation></Navigation>
                    	<Logs></Logs>
                    </Cell>
                    <Cell col={8}>
                        <Map></Map>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default App;
