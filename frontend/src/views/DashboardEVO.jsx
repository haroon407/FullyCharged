import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Table } from "react-bootstrap";

import { createBrowserHistory } from "history";

import BookingsService from "../services/bookings.services";

import config from "react-global-configuration";

class DashboardEVO extends Component {
  constructor(props) {
    super(props);

    let configFile = config.serialize();
    if (configFile !== "null") {
      this.user = config.get("user");
    } else {
      // If the user is not signed in
      this.props.history.push("/index");
    }

    this.state = {
      loading: true,

      dataPie: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [90, 50, 250, 40, 120, 90],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              "#4D5360",
              "#AC64AD",
              "#9932CC"
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774",
              "#DA92DB",
              "#800080"
            ]
          }
        ]
      }
    };
  }

  history = createBrowserHistory();

  render() {
    if (this.loading || this.user === null) {
      return "Loading...";
    }
    return (
      <div className="content">
        <h2>Current Month Bookings Details</h2>
        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Date and Time</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>22-07-2019 14:00 - 14:30</td>
              <td>Theresienstraße 23 80333 München</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>2</td>
              <td>18-07-2019 10:00 - 11:00</td>
              <td>Boltzmannstraße 12 85748 Garching bei München</td>
              <td>Cancelled - Basic booking fees deducted!</td>
            </tr>

            <tr>
              <td>3</td>
              <td>10-07-2019 17:00 - 17:30</td>
              <td>Boltzmannstraße 12 85748 Garching bei München</td>
              <td>Charged - Payment 8.9 Euros successful</td>
            </tr>

            <tr>
              <td>4</td>
              <td>05-07-2019 12:00 - 13:00</td>
              <td>Theresienstraße 23 80333 München</td>
              <td>Charged - Payment 12.5 Euros successful</td>
            </tr>
          </tbody>
        </Table>
        <MDBContainer>
          <h3 className="mt-5">
            Energy consumed (in Kilo Watts Hour)over last 6 months
          </h3>
          <Pie data={this.state.dataPie} options={{ responsive: true }} />
        </MDBContainer>
      </div>
    );
  }
}

export default DashboardEVO;
