import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Accordion, Button } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

class DashboardEVO extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Booking ID: 101 Date: 16.07.2019 Time: 14:00 - 14:30
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h2>Booking ID: 101</h2>
                    Date: 16.07.2019 Time: 14:00 - 14:30 Estimated charge: 42%
                    Estimated Charging cost: 8.9 Euros Charger Name: TX2098
                    Booking Date: 14.07.2019
                    <Button variant="danger">Cancel Booking</Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Booking ID: 201 Date: 17.07.2019 Time: 11:30 - 12:30
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h2>Booking ID: 201</h2>
                    Date: 17.07.2019 Time: 11:30 - 12:30 Estimated charge: 42%
                    Estimated Charging cost: 8.9 Euros Charger Name: TX2098
                    Booking Date: 14.07.2019
                    <Button variant="danger">Cancel Booking</Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Booking ID: 301 Date: 18.07.2019 Time: 11:30 - 12:30
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <h2>Booking ID: 301</h2>
                    Date: 18.07.2019 Time: 11:30 - 12:30 Estimated charge: 42%
                    Estimated Charging cost: 8.9 Euros Charger Name: TX2098
                    Booking Date: 14.07.2019
                    <Button variant="danger">Cancel Booking</Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default DashboardEVO;
