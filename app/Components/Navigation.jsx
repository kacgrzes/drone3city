import React from 'react';
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
var image = require("file!../drone.jpg");

class Navigation extends React.Component {

    //CONSTRUCTOR
    constructor() {
      super();
      this.handleTakeOff = this.handleTakeOff.bind(this);
    }

    //RENDER
    render() {
    	return 	<Card shadow={3} style={{width: 'auto', height: '300px'}}>
                    <CardTitle expand style={{height: '20px', color: '#fff', background: 'url(' + image + ') bottom right 15% no-repeat #46B6AC'}}>
                    	Navigation
                    </CardTitle>
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenan convallis.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenan convallis.
                    </CardText>
                    <CardActions border>
                        <Button onClick={this.handleTakeOff} raised accent ripple>View Updates</Button>
                    </CardActions>
                </Card>
    }

    handleTakeOff () {
        this.props.onTakeOff({
            text: 'Hello world!',
            title: 'Title'
        });
    }
}

export default Navigation;
 
