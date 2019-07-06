import React, {Component} from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
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
            "enabled": true,
            "basicBookingFee": 0,
            "cancellationTimeout": 0
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
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Location Name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Location Name",
                                                    defaultValue: ""
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
                                                    defaultValue: ""
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
                                                    defaultValue: ""
                                                },
                                                {
                                                    label: "State",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "State",
                                                    defaultValue: ""
                                                },
                                                {
                                                    label: "Postal Code",
                                                    type: "number",
                                                    bsClass: "form-control",
                                                    placeholder: "ZIP Code"
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
                                                    defaultValue: ""
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
                                                    defaultValue: ""
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
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Charger Name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Charger Name",
                                                    defaultValue: ""
                                                }
                                            ]}
                                        />
                                        <label htmlFor="chargerType">Type of charger</label>
                                        <select className="form-control" id="chargerType">
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
                                                    defaultValue: ""
                                                }
                                            ]}
                                        />
                                        <Button bsStyle="danger" pullRight fill type="cancel">
                                            Cancel
                                        </Button>
                                        <Button bsStyle="info form-save" pullRight fill type="submit">
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
