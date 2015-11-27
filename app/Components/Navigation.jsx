import React from 'react';
import { Card, CardTitle, CardText, CardActions, FABButton, Icon, Button } from 'react-mdl';
var image = require("file!../drone.jpg");

class Navigation extends React.Component {

    //CONSTRUCTOR
    constructor() {
      super();
      this.handleTakeOff = this.handleTakeOff.bind(this);
      this.handleArming = this.handleArming.bind(this);
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
                        <FABButton 
                            colored 
                            ripple 
                            onClick={this.handleArming}>
                                <Icon name="vpn_key"/>
                        </FABButton>
                        <Button onClick={this.handleTakeOff} raised accent ripple>Oderwij od ziemi</Button>
                    </CardActions>
                </Card>
    }

    handleArming () {
        this.props.onArming({
            type: 'success',
            text: 'Uzbrojono drona!',
            title: 'Sukces'
        });
    }

    handleTakeOff () {
        this.props.onTakeOff();
    }
}

export default Navigation;
 
