import React from 'react';
import { Card, CardTitle, CardText, CardActions, Button, DataTable } from 'react-mdl';
require("./Logs.css");

class Logs extends React.Component {
  render() {
	return 	<Card className="logs-card" shadow={3}>
                <CardTitle className="logs-title">
                	Logi
                </CardTitle>
                <CardText className="logs-card-text">
                <DataTable className="logs-table"
                    columns={[
                        {name: 'type', label: 'Type'},
                        {name: 'text', label: 'Message'}
                    ]}
                    data={[
                        {type: 'Błąd', text: 'Zły start'},
                        {type: 'Sukces', text: 'Dobry start'},
                        {type: 'Błąd', text: 'Zły start'}
                    ]}/>
                </CardText>
            </Card>
  }
}

export default Logs;
