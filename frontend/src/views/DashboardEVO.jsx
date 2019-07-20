import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { MDBCol, MDBIcon } from "mdbreact";
import { Grid, Row, Col, Table, Accordion, Button } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

import BookingsService from "../services/bookings.services";
//import VehicleModelsService from "../services/vehiclemodels.services";

class DashboardEVO extends Component {
  state = {
    loading: true
  };
  allBookings = [];

  constructor(props) {
    super(props);
    this.state = {
      bookingsObject: [
        {
          used: false, // Used yet - if yes keep the cancel button inactive
          canceled: false, // Canceled yet - if no make the cancel button active
          _id: "5d30efc1c0ea4539d815f639", // Booking ID
          startTime: "2019-07-20T06:00:00.000Z", // Booking time period
          endTime: "2019-07-20T09:59:59.000Z", // Booking time period
          chargingUnit: "5d30efc1c0ea4539d815f601", // Charging Unit ID
          estimatedChargePercentage: 88, // Estimated charge (in %)
          estimatedChargekWh: 88, // Estimated charge (in kwh)
          estimatedChargingCost: 29.04, // Estimated charging cost
          estimatedVolumeFee: 1.452, // Estimated Voulme fee
          evo: "5d30efc1c0ea4539d815f5e9", // NOT REQUIRED
          createdAt: "2019-07-18T22:16:33.532Z", // Booked on
          updatedAt: "2019-07-18T22:16:33.532Z" // Last updated : Is it required?
        }
      ]
    };
  }

  componentWillMount() {
    BookingsService.getAllBookings().then(data => {
      this.allBookings = data;
      this.setState({ loading: false });
    });
  }

  onSearch(){
    BookingsSerice.get

  }

  onCancel(){

  }

  history = createBrowserHistory();

  render() {
    if (this.loading) {
      return "Loading...";
    }
    return (
      <div className="bookingTable">
        <Grid fluid>
          <Row>
            <Col md={1} className="searchIcon">
              <MDBIcon icon="search" />
            </Col>
            <Col md={4} className="searchBox">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Booking Details "
                category=" Subtitle"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.allBookings.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{JSON.stringify(prop)}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default DashboardEVO;
