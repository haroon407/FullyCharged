import React, {Component} from "react";
import { Grid, Row, Col, Table, Collapse } from "react-bootstrap";

import {Card} from "components/Card/Card.jsx";
import {FormInputs} from "components/FormInputs/FormInputs.jsx";
import {UserCard} from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

import MakeBookingService from "../services/makeBooking.services";
import AuthService from "../services/auth.services";
import TestService from "../services/testService.services";


class MakeBooking extends Component {
    constructor(props) {
        super(props);
        this.state = this.getEmptyState();

        //mirzet.brkic@tum.de
        //greenenergy@tum.de
        //pa$$w0rd
        //messi@tum.de
        //petuh2@gmail.com
        //test2012ktl
        // AuthService.loginUser('greenenergy@tum.de', 'pa$$w0rd');
        AuthService.loginUser('mirzet.brkic@tum.de', 'pa$$w0rd');

        MakeBookingService.getData()
        .then(res => {
          console.log(res);
          let user = {
            vehicleModel: {
              batteryCapacity: 200
            },
            volumeFeePrecentage: 5
          };
          let parsedChargers = MakeBookingService.getCostDetails(res.chargerTypes[0], 1, user);
          this.setState({
            selectedChargerId: 0,
            chargingLocation: res.chargingLocation,
            chargers: res.chargerTypes,
            date: res.date,
            startTime: res.startTime,
            finishTime: res.startTime + 1,
            estimatedCharge: parsedChargers.estimatedCharge,
            bookingFee: parsedChargers.basicBookingFee,
            estimatedChargingCost: parsedChargers.estimatedChargingCost,
            volumeFee: parsedChargers.volumeFee,
            estimatedTotalCost: parsedChargers.estimatedTotalCost
          });
        })
        .catch(err => console.log('There was an error:' + err));

        this.availableHours = ["10.00", "11.00", "12.00", "13.00"];

        this.bookNow = this.bookNow.bind(this);
        this.cancel = this.cancel.bind(this);
        this.updateUI = this.updateUI.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };



    getEmptyState(){
      return {
        selectedChargerId: 0,
        chargingLocation: "Loading..",
        chargers: [],
        date: "Loading..",
        startTime: "Loading..",
        finishTime: "Loading..",
        estimatedCharge: "Loading..",
        bookingFee: "Loading..",
        estimatedChargingCost: "Loading..",
        volumeFee: "Loading..",
        estimatedTotalCost: "Loading.."
      };
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = event.target.value;
        console.log("Changed: " + value + name);
    }

    bookNow(){
      MakeBookingService.makeBooking()
      .then(res => {
        // this.setState(res);
        // TODO: Go to history page
      })
      .catch(err => console.log('There was an error:' + err));
    }

    // TEST MODE
    // MakeBookingService.getData();
    // MakeBookingService.getData().then(res => {
    //   console.log(res);
    // }).catch(err => console.log('There was an error:' + err));
    cancel(event){

      event.preventDefault();
    }

    updateUI(event){
      const id = event.target.value;
      console.log("Selected: " + id);
      // this.setState(this.getEmptyState());
      // this.setState(MakeBookingService.getCostDetails(id));
    }


    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Booking Details"
                                content={
                                    <form onSubmit={this.handleSubmit}>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Charging Location",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "",
                                                    value: this.state.chargingLocation,
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <Row>
                                        <div className="col-md-12">
                                        <FormGroup>
                                          <ControlLabel>Charger Type</ControlLabel>
                                          <select className="form-control" onChange={this.updateUI} value={this.state.selectedLocationId}>
                                              {
                                                  this.state.chargers.map((x) => <option value={x.id}>
                                                      {x.charger}
                                                  </option>)
                                              }
                                          </select>
                                        </FormGroup>
                                        </div>
                                        </Row>
                                        <Row>
                                        <div className="col-md-4">
                                        <FormGroup>
                                          <ControlLabel>Date</ControlLabel>
                                          <FormControl {...{
                                            type: "text",
                                            bsClass: "form-control",
                                            value: this.state.date,
                                            disabled: true
                                          }}/>
                                        </FormGroup>
                                        </div>
                                        <div className="col-md-4">
                                        <FormGroup>
                                          <ControlLabel>Start time</ControlLabel>
                                          <FormControl {...{
                                            type: "text",
                                            bsClass: "form-control",
                                            placeholder: "10.00",
                                            value: this.state.startTime,
                                            name: "city",
                                            onChange: this.handleInputChange,
                                            required: true,
                                            disabled: true
                                          }}/>
                                        </FormGroup>
                                        </div>
                                        <div className="col-md-4">
                                        <FormGroup>
                                          <ControlLabel>Finish time</ControlLabel>
                                          <select className="form-control" onChange={this.updateUI} value={this.state.selectedLocationId}>
                                              {
                                                  this.availableHours.map((x) => <option>
                                                      {x}
                                                  </option>)
                                              }
                                          </select>
                                        </FormGroup>
                                        </div>
                                        </Row>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                    <Col md={12}>
                      <Card
                        title="Cost Details"
                        ctTableResponsive
                        content={
                          <div className="clearfix">
                          <Table striped hover>
                            <tbody>
                            <tr>
                            <td>Estimated charge</td>
                            <td>{this.state.estimatedCharge} kW</td>
                            </tr>
                            <tr>
                            <td>Booking fee</td>
                            <td>{this.state.bookingFee} €</td>
                            </tr>
                            <tr>
                            <td>Estimated charging cost</td>
                            <td>{this.state.estimatedChargingCost} €</td>
                            </tr>
                            <tr>
                            <td>Volume fee</td>
                            <td>{this.state.volumeFee} €</td>
                            </tr>
                            <tr>
                            <td><b>Estimated total cost</b></td>
                            <td><b>{this.state.estimatedTotalCost} €</b></td>
                            </tr>
                            </tbody>
                          </Table>
                          <Button bsStyle="danger" pullRight fill type="cancel" onClick={this.cancel}>
                              Cancel
                          </Button>
                          <Button bsStyle="info form-save" pullRight fill type="submit" onClick={this.bookNow}>
                              Book Now
                          </Button>
                          </div>
                        }
                      />
                    </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default MakeBooking;
