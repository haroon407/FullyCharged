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

import ChargingLocationService from "../services/chargingLocation.services";

class AddLocation extends Component {
    state = {
        loading: true
    };
    chargerTypes = [];

    constructor(props) {
        super(props);
        this.state = {
            locationObject: {
                name: "",
                address: {
                    street: "",
                    city: "",
                    state: "",
                    postalCode: 0,
                    country: ""
                },
                chargingUnits: [],
                enabled: true,
                deleted: false,
                basicBookingFee: 0.14,
                cancellationTimeout: 0,
                owner: "5d2fb5270c8c3c33abfb0e72"
            }
        };
        this.state.chargingUnitObj = {
            name: "",
            enabled: true,
            energyPrice: 0.0,
            chargerType: {
                chargingLevel: 0,
                power: 0,
                connector: ""
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillMount() {
        ChargingLocationService.getChargerTypes().then((data) => {
            this.chargerTypes = data;
            this.setState({loading: false});
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // For Address
        if (name === 'street' || name === 'city' || name === 'country' || name === 'state' || name === 'postalCode') {
            this.setState(prevState => {
                let locationObject = Object.assign({}, prevState.locationObject); // creating copy of state variable address
                locationObject.address[name] = value; // update the property, assign the value
                return {locationObject}; // return new object address
            });
        } else if (name === 'chargerName' || name === 'energyPrice' || name === 'chargerType') {
            // For charging unit
            if (name === 'chargerName') {
                this.setState(prevState => {
                    let chargingUnitObj = Object.assign({}, prevState.chargingUnitObj);
                    chargingUnitObj.name = value;
                    return {chargingUnitObj};

                });
            } else if (name === 'chargerType') {
                this.setState(prevState => {
                    let chargingUnitObj = Object.assign({}, prevState.chargingUnitObj);
                    chargingUnitObj.chargerType = JSON.parse(value); // Parsing string value back to object
                    return {chargingUnitObj}
                });
            } else {
                this.setState(prevState => {
                    let chargingUnitObj = Object.assign({}, prevState.chargingUnitObj);
                    chargingUnitObj[name] = value;
                    return {chargingUnitObj};
                });
            }
        } else {
            // For rest of the form
            this.setState(prevState => {
                let locationObject = Object.assign({}, prevState.locationObject); // creating copy of state variable address
                locationObject[name] = value; // update the property, assign the value
                return {locationObject}; // return new object address
            });
        }
    }

    handleSubmit(event) {
        // Call the API function
        ChargingLocationService.addLocation(this.state.locationObject).then((data) => {
            this.props.showNotification('success', 'Added successfully');
        }).catch((err) => {
            this.props.showNotification('error', 'Error while adding location');
        });
        event.preventDefault();
    }

    onAddItem = () => {
        this.setState(state => {
            if (state.chargingUnitObj.name === '') {
                state.chargingUnitObj.name = 'Charger ' + (state.locationObject.chargingUnits.length + 1);
            }
            const chargingUnits = [...state.locationObject.chargingUnits, state.chargingUnitObj];
            let locationObject = Object.assign({}, state.locationObject);
            locationObject.chargingUnits = chargingUnits;
            const chargingUnitObj = {
                name: "",
                enabled: true,
                energyPrice: 0.0,
                chargerType: {
                    chargingLevel: 0,
                    power: 0,
                    connector: ""
                }
            };
            return {
                locationObject,
                chargingUnitObj
            };
        });
        document.getElementById('chargerTypeSelect').selectedIndex = "0";
    };

    onDeleteItem = (e, index) => {
        this.setState(state => {
            let chargingUnits = [...state.locationObject.chargingUnit];
            let locationObject = Object.assign({}, state.locationObject);
            chargingUnits.splice(index, 1);
            locationObject.chargingUnits = chargingUnits;
            return {
                locationObject,
            };
        });
        e.preventDefault(); // Prevents form from auto submitting
    };

    render() {
        if (this.loading) {
            return 'Loading...'
        }
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
                                                    value: this.state.locationObject.name,
                                                    name: "name",
                                                    onChange: this.handleInputChange,
                                                    required: true
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
                                                    value: this.state.locationObject.address.street,
                                                    name: "street",
                                                    onChange: this.handleInputChange,
                                                    required: true
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
                                                    value: this.state.locationObject.address.city,
                                                    name: "city",
                                                    onChange: this.handleInputChange,
                                                    required: true
                                                },
                                                {
                                                    label: "State",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "State",
                                                    value: this.state.locationObject.address.state,
                                                    name: "state",
                                                    onChange: this.handleInputChange,
                                                    required: true
                                                },
                                                {
                                                    label: "Postal Code",
                                                    type: "number",
                                                    bsClass: "form-control",
                                                    placeholder: "Postal Code",
                                                    name: "postalCode",
                                                    value: this.state.locationObject.address.postalCode,
                                                    onChange: this.handleInputChange,
                                                    required: true
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
                                                    value: this.state.locationObject.address.country,
                                                    name: "country",
                                                    onChange: this.handleInputChange,
                                                    required: true
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
                                                    value: this.state.locationObject.basicBookingFee,
                                                    disabled: true,
                                                    required: true
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
                                                    value: this.state.locationObject.cancellationTimeout,
                                                    name: "cancellationTimeout",
                                                    onChange: this.handleInputChange,
                                                    required: true
                                                }
                                            ]}
                                        />

                                        <Row>
                                            <Col md={12}>
                                                <label>Charging Units</label>
                                                {this.state.locationObject.chargingUnits.map((value, index) => {
                                                    return <div className="row charging-units">
                                                        <div className={"col-md-8"}
                                                             key={index}>{value.name + ' ' + value.chargerType.connector}</div>
                                                        <div className={"col-md-4"}>
                                                            <button
                                                                className="btn-xs btn-info btn-text-white btn-margin-15 btn-position"
                                                                pullRight fill>Update
                                                            </button>
                                                            <button
                                                                className="btn-xs btn-danger btn-text-white btn-margin-15 btn-position"
                                                                pullRight fill
                                                                onClick={(e) => this.onDeleteItem(e, index)}>Delete
                                                            </button>
                                                        </div>
                                                    </div>
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
                                        <FormInputs id="charging-unit"
                                                    ncols={["col-md-12"]}
                                                    properties={[
                                                        {
                                                            label: "Charger Name",
                                                            type: "text",
                                                            bsClass: "form-control",
                                                            placeholder: "Charger Name",
                                                            name: "chargerName",
                                                            value: this.state.chargingUnitObj.name,
                                                            onChange: this.handleInputChange
                                                        }
                                                    ]}
                                        />
                                        <label htmlFor="chargerType">Type of charger</label>
                                        <select id="chargerTypeSelect" className="form-control" name="chargerType"
                                                onChange={this.handleInputChange}>
                                            {
                                                this.chargerTypes.map((x, value) => <option key={value}
                                                                                            value={JSON.stringify(x)}>
                                                    {x.connector}
                                                </option>)
                                            }
                                        </select>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Cost per kWh",
                                                    type: "number",
                                                    bsClass: "form-control",
                                                    placeholder: "Cost per kWh",
                                                    name: "energyPrice",
                                                    value: this.state.chargingUnitObj.energyPrice,
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />
                                        <Button bsStyle="danger" pullRight fill type="reset">
                                            Cancel
                                        </Button>
                                        <Button name="charging_unit_form" style={{marginRight: '15px'}} bsStyle="info"
                                                pullRight fill type="button"
                                                onClick={this.onAddItem}>
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
