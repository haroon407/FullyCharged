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

class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.chargerTypes = [
            {chargingLevel: 1, power: 7.4, connector: "Type 1 plug"},
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
            cancellationTimeout: 0
        };
        this.chargingUnit = {
            name: "",
            enabled: true,
            energyPrice: 0.0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // For Address
        if (name === 'street' || name === 'city' || name === 'country' || name === 'state' || name === 'postalCode') {
            this.state.address[name] = value;
        } else if (name === 'chargerName' || name === 'energyPrice' || name === 'chargerType') {
            // For charging unit
            if (name === 'chargerName') {
                this.chargingUnit.name = value;
            } else {
                this.chargingUnit[name] = value;
            }
        } else {
            // For rest of the form
            this.state[name] = value;
        }
    }

    handleSubmit(event) {
        const target = event.target;
        const name = target.name;
        // Adding a charging unit in state variable
        debugger;
        if(name === 'charging_unit_form'){
            // this.state.chargingUnit.push(JSON.parse(JSON.stringify(this.chargingUnit)));
            this.state.chargingUnit.push(this.chargingUnit);
            this.chargingUnit = this.clearChargingUnit();
            debugger;
        } else {
            alert('A form was submitted: ' + this.state);
        }
        event.preventDefault();
    }

    clearChargingUnit() {
        return {
            name: "",
            enabled: true,
            energyPrice: 0.14
        };
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6}>
                            <Card
                                title="Charging Location"
                                content={
                                    <form name="location_form" onSubmit={this.handleSubmit}>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Location Name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Location Name",
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
                                                    label: "Street",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Street",
                                                    defaultValue: "",
                                                    name: "street",
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-4", "col-md-4", "col-md-4"]}
                                            properties={[
                                                {
                                                    label: "City",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "City",
                                                    defaultValue: "",
                                                    name: "city",
                                                    onChange: this.handleInputChange
                                                },
                                                {
                                                    label: "State",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "State",
                                                    defaultValue: "",
                                                    name: "state",
                                                    onChange: this.handleInputChange
                                                },
                                                {
                                                    label: "Postal Code",
                                                    type: "number",
                                                    bsClass: "form-control",
                                                    placeholder: "Postal Code",
                                                    name: "postalCode",
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Country",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Country",
                                                    defaultValue: "",
                                                    name: "country",
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Basic Booking Fee (Euros)",
                                                    type: "number",
                                                    bsClass: "form-control",
                                                    placeholder: "Basic Booking Fee (Euros)",
                                                    defaultValue: this.state.basicBookingFee,
                                                    disabled: true
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Cancellation Timeout (Minutes)",
                                                    type: "number",
                                                    bsClass: "form-control",
                                                    placeholder: "Cancellation Timeout",
                                                    defaultValue: "",
                                                    name: "cancellationTimeout",
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />

                                        <Row>
                                            <Col md={12}>
                                                <label>Charging Units</label>
                                                {this.state.chargingUnit.map((value, index) => {
                                                    return <div key={index}>{value}</div>
                                                })}
                                            </Col>
                                        </Row>
                                        <Button bsStyle="info" pullRight fill type="submit">
                                            Add Charging Location
                                        </Button>
                                        <div className="clearfix"/>
                                    </form>
                                }
                            />
                        </Col>

                        <Col md={6}>
                            <Card
                                title="Add/Edit Charging Unit"
                                content={
                                    <form name="charging_unit_form" onSubmit={this.handleSubmit}>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Charger Name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Charger Name",
                                                    defaultValue: "",
                                                    name: "chargerName",
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />
                                        <label htmlFor="chargerType">Type of charger</label>
                                        <select className="form-control" name="chargerType"
                                                onChange={this.handleInputChange}>
                                            {
                                                this.chargerTypes.map((x) => <option value={x}>
                                                    {x.connector}
                                                </option>)
                                            }
                                        </select>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Cost per kWh",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Street",
                                                    defaultValue: "",
                                                    name: "energyPrice",
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />
                                        <Button bsStyle="danger" pullRight fill type="reset">
                                            Cancel
                                        </Button>
                                        <Button style={{marginRight:'15px'}} bsStyle="info" pullRight fill type="submit">
                                            Add/Update Charging unit
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

export default AddLocation;
