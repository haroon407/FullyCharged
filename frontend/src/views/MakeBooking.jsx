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

class MakeBooking extends Component {
    constructor(props) {
        super(props);
        this.chargerTypes = [
            {chargingLevel: 1, power: 7.4, connector: "Tesla HPWC"},
            {chargingLevel: 2, power: 22, connector: "Type 2 plug"},
            {chargingLevel: 3, power: 50, connector: "TCHAdeMO plug"},
            {chargingLevel: 3, power: 150, connector: "Tesla Supercharger"}
        ];
        // Initializing state
        this.state = {
            name: "",
            address: {
                street: "",
                city: "",
                state: "",
                postalCode: 12343,
                country: ""
            },
            chargingUnit: [],
            enabled: true,
            basicBookingFee: 0.14,
            cancellationTimeout: 0,
            chargingLocation: "Baker street 22"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    testFunc(){

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === 'street' || name === 'city' || name === 'country' || name === 'state' || name === 'postalCode') {
            this.state.address[name] = value;
        } else {
            this.state[name] = value;
        }
    }



    handleSubmit(event) {
        //alert('A form was submitted: ' + this.state);

        MakeBookingService.makeBooking()
        .then(res => {
          this.setState(res)
          console.log(res)
        })
        .catch(err => console.log('There was an error:' + err));

        event.preventDefault();
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
                                                    defaultValue: this.state.chargingLocation,
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <label htmlFor="chargerType">Charger Type</label>
                                        <select className="form-control" id="chargerType">
                                            {
                                                this.chargerTypes.map((x) => <option value={x}>
                                                    {x.connector + " | L" + x.chargingLevel + " | " + x.power + "kW"}
                                                </option>)
                                            }
                                        </select>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Date",
                                                    type: "date",
                                                    bsClass: "form-control",
                                                    placeholder: "07/26/2019",
                                                    defaultValue: "",
                                                    name: "name",
                                                    onChange: this.handleInputChange
                                                }

                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Time",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "12.00 - 17.00",
                                                    defaultValue: "12.00 - 17.00",
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
                                                    value: this.state.basicBookingFee,
                                                    defaultValue: "42% (32kWh)",
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
                                                    placeholder: "",
                                                    defaultValue: "0.5 €",
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
                                                    defaultValue: "8.96 €",
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
                                                    defaultValue: "0.448 €",
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
                                                    defaultValue: "9.908 €",
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <Button bsStyle="danger" pullRight fill type="cancel" onClick={this.testFunc}>
                                            Cancel
                                        </Button>
                                        <Button bsStyle="info form-save" pullRight fill type="submit">
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
