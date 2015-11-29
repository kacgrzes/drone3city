import React from 'react';
import { Card, CardTitle, CardText, CardActions, FABButton, Icon, Button, Slider, Tooltip } from 'react-mdl';
require('./Navigation.css');

class Navigation extends React.Component {

    //CONSTRUCTOR
    constructor() {
      super();
      this.handleTakeOff = this.handleTakeOff.bind(this);
      this.handleArming = this.handleArming.bind(this);
    }

    //RENDER
    render() {
        return  <Card className="nav-card" shadow={3}>
                    <CardTitle expand className="nav-title">
                        Nawigacja
                    </CardTitle>
                    <CardText>
                    Ustaw wysokość zawisu drona: 
                        <Slider min={0} max={100} defaultValue={25} />
                    </CardText>
                    <CardActions border>
                        <Tooltip label="Print" large >
                            <FABButton 
                                colored 
                                ripple 
                                onClick={this.handleArming}>
                                    <Icon name="vpn_key"/>
                            </FABButton>    
                        </Tooltip>
                        
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
 
