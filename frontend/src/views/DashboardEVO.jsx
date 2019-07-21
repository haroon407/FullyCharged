import React, { Component } from "react";
import { Tabs } from "components/Tabs/Tabs.jsx";
//import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import { thArray, tdArray } from "variables/Variables.jsx";
import Card from "components/Card/Card.jsx";

import { createBrowserHistory } from "history";

import BookingsService from "../services/bookings.services";
//import VehicleModelsService from "../services/vehiclemodels.services";

class DashboardEVO extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      bookingsObject: []
      //   {
      //     used: false, // Used yet - if yes keep the cancel button inactive
      //     canceled: false, // Canceled yet - if no make the cancel button active
      //     _id: "5d30efc1c0ea4539d815f639", // Booking ID
      //     startTime: "2019-07-20T06:00:00.000Z", // Booking time period
      //     endTime: "2019-07-20T09:59:59.000Z", // Booking time period
      //     chargingUnit: "5d30efc1c0ea4539d815f601", // Charging Unit ID
      //     estimatedChargePercentage: 88, // Estimated charge (in %)
      //     estimatedChargekWh: 88, // Estimated charge (in kwh)
      //     estimatedChargingCost: 29.04, // Estimated charging cost
      //     estimatedVolumeFee: 1.452, // Estimated Voulme fee
      //     evo: "5d30efc1c0ea4539d815f5e9", // NOT REQUIRED
      //     createdAt: "2019-07-18T22:16:33.532Z", // Booked on
      //     updatedAt: "2019-07-18T22:16:33.532Z" // Last updated : Is it required?
      //   }
      // ]
    };
  }

  // componentDidMount() {
  // debugger;
  // BookingsService.getAllBookings().then(res => {
  // const bookingsObject = res.data;
  // this.setState({bookingsObject});
  // this.setState({ loading: false });
  // });
  // }

  componentWillMount() {
    debugger;
    BookingsService.getAllBookings().then(data => {
      //   this.setState(()=>{
      //     const bookingsObject = data;
      //     return {
      //       bookingsObject,
      //     }
      // });
      this.bookingsObject = data;
      debugger;
      this.setState({ loading: false });
    });
  }

  onCancel = (event, bookingId) => {
    event.preventDefault();
    if (window.confirm("Are you sure you wish to cancel your booking?")) {
      console.log("Yes, cancel it");
      //BookingsService.cancelBookingById(bookingId).then
    }
  };

  history = createBrowserHistory();

  render() {
    if (this.loading) {
      return "Loading...";
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="All Booking details"
                category="Here is a subtitle for this table"
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
                      <Col md={8}>
                        {this.state.bookingsObject.map((x, key) => {
                          return (
                            <tr key={x._id}>
                              {x.map((x, key) => {
                                return <td key={x._id}>{JSON.stringify(x)}</td>;
                              })}
                            </tr>
                          );
                        })}
                      </Col>
                      <Col md={4}>
                        <button
                          className="btn-xs btn-primary btn-text-white btn-margin-15 btn-position"
                          // onClick={() => this.onCancel(bookingsObject.id)}
                        >
                          Cancel
                        </button>
                      </Col>
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
