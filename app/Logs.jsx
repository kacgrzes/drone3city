import React from 'react';
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';

class Logs extends React.Component {
  render() {
	return 	<Card shadow={3} style={{width: 'auto', height: '300px', marginTop: '20px'}}>
                <CardTitle>
                	Logs
                </CardTitle>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenan convallis.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenan convallis.
                </CardText>
                <CardActions border>
                    <Button raised accent ripple>View Updates</Button>
                </CardActions>
            </Card>
  }
}

export default Logs;
 
