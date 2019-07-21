import React, { Component } from "react";
//import { Tabs } from "components/Tabs/Tabs.jsx";
//import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
//import { thArray, tdArray } from "variables/Variables.jsx";
import Card from "components/Card/Card.jsx";

import { MyTest } from "components/Analytics/MyTest.jsx";

//import { createBrowserHistory } from "history";

//import BookingsService from "../services/bookings.services";
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
    this.collapseBool = false;
    this.tableElement = React.createRef();

    this.cancel = this.cancel.bind(this);
  }

  cancel(event) {
    this.collapseBool = !this.collapseBool;
    this.tableElement.current.setOpen(this.collapseBool);
    event.preventDefault();
  }

  render() {
    return (
      <div className="content">
        <Button
          bsStyle="danger"
          pullRight
          fill
          type="cancel"
          onClick={this.cancel}
        >
          Cancel
        </Button>
        TEXT
        <MyTest ref={this.tableElement} />
      </div>
    );
  }
}

export default DashboardEVO;
