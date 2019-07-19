import React, {Component} from "react";
import {
    Grid,
    Row,
    Col
} from "react-bootstrap";

import {Card} from "components/Card/Card.jsx";
import {FormInputs} from "components/FormInputs/FormInputs.jsx";
import {UserCard} from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import avatar from "assets/img/faces/face-3.jpg";

import MakeBookingService from "../services/makeBooking.services";
import AuthService from "../services/auth.services";

class MakeBooking extends Component {
    constructor(props) {
        super(props);
        this.state = this.getEmptyState();
        this.chargerTypes = [
            {id: 1, chargingLevel: 1, power: 7.4, connector: "Tesla HPWC"},
            {id: 2, chargingLevel: 2, power: 22, connector: "Type 2 plug"},
            {id: 3, chargingLevel: 3, power: 50, connector: "TCHAdeMO plug"},
            {id: 4, chargingLevel: 3, power: 150, connector: "Tesla Supercharger"}
        ];
        // this.chargerTypes = MakeBookingService.getChargers()
        // .then(res => {
        //   this.chargerTypes = res;
        //   if (res!=null && res[0]!=null) {
        //     this.updateUI({target: {value: res[0].id}});
        //   }
        // })
        // .catch(err => console.log('There was an error:' + err));
        // Initializing state
        // AuthService.loginUser('greenenergy@tum.de', 'pa$$w0rd');


        MakeBookingService.testFunc()
        .then(res => {
          console.log("Succ");
          console.log(res);
        })
        .catch(err => console.log('There was an error:' + err));
        

        this.bookNow = this.bookNow.bind(this);
        this.cancel = this.cancel.bind(this);
        this.updateUI = this.updateUI.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    getEmptyState(){
      return {
        selectedChargerId: 0,
        address: {
          street: "Loading..",
          city: "",
          state: "",
          postalCode: "",
          country: ""
        },
        date: new Date(),
        time: "Loading..",
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

    cancel(event){
      // TEST MODE
      event.preventDefault();
      // AuthService.loginUser('greenenergy@tum.de', 'pa$$w0rd');
      // AuthService.registerUser('Sasalka', 'sasi@mail.com', 'pa$$w0rd', 'EVCP');

      // var xhr = new XMLHttpRequest();
      // xhr.open("POST", 'http://localhost:3001/auth/register', true);
      // xhr.setRequestHeader('Content-Type', 'application/json');
      // xhr.send(JSON.stringify({
      //   name: "Peter",
      //   email: 'peter.griffin@gmail.com',
      //   password: 'test2012ktl',
      //   role: 'EVCP'
      // }));
      // xhr.onload = function() {
      //   console.log("HELLO")
      //   console.log(this.responseText);
      //   var data = JSON.parse(this.responseText);
      //   console.log(data);
      // }

      // var xhr = new XMLHttpRequest();
      // xhr.open("POST", 'http://localhost:3001/auth/login', true);
      // xhr.setRequestHeader('Content-Type', 'application/json');
      // xhr.send(JSON.stringify({
      //   email: 'greenenergy@tum.de',
      //   password: 'pa$$w0rd'
      // }));
      // xhr.onload = function() {
      //   // console.log(this.responseText);
      //   var data = JSON.parse(this.responseText);
      //   var str = data.token;
      //   console.log("Got: " + str);
      //
      //   MakeBookingService.testFunc(str).then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => console.log('There was an error:' + err));
      // }

// ===========
      // MakeBookingService.testFunc().then(res => {
      //   this.setState(res);
      // })
      // .catch(err => console.log('There was an error:' + err));
      //
      //
      // // TODO: Go to previous page
      // this.setState(this.getEmptyState());
      //
      // // TODO: Get input data as headers
      // // Load calculated data from server and fill estimated cost data
      // this.updateUI({target: {value: 1}});
      event.preventDefault();
    }

    updateUI(event){
      const id = event.target.value;

      this.setState(this.getEmptyState());
      MakeBookingService.calculateCost(id)
      .then(res => {
        this.setState(res);
      })
      .catch(err => console.log('There was an error:' + err));
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
                                                    value: this.state.address.street + ", " + this.state.address.postalCode + ", " + this.state.address.city + ", " + this.state.address.country,
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <label htmlFor="chargerType">Charger Type</label>
                                        <select className="form-control" >
                                            {
                                                this.chargerTypes.map((x) => <option value={x.id}>
                                                    {x.connector + " | L" + x.chargingLevel + " | " + x.power + "kW"}
                                                </option>)
                                            }
                                        </select>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    name: "date",
                                                    label: "Date",
                                                    type: "date",
                                                    value: this.state.date,
                                                    bsClass: "form-control",
                                                    onChange: this.handleInputChange
                                                }

                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    name: "time",
                                                    label: "Time",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    value: this.state.time,
                                                    name: "street",
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Estimated Charge",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "",
                                                    value: this.state.estimatedCharge,
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Booking Fee",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    value: this.state.bookingFee,
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Estimated Charging Cost",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "",
                                                    value: this.state.estimatedChargingCost,
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Volume Fee [5%]",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "",
                                                    value: this.state.volumeFee,
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Estimated Total Cost",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "",
                                                    value: this.state.estimatedTotalCost,
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <Button bsStyle="danger" pullRight fill type="cancel" onClick={this.cancel}>
                                            Cancel
                                        </Button>
                                        <Button bsStyle="info form-save" pullRight fill type="submit" onClick={this.bookNow}>
                                            Book Now
                                        </Button>
                                        <div className="clearfix"/>
                                    </form>
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
