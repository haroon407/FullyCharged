import React, {Component} from "react";
import {
    Grid,
    Row,
    Col
} from "react-bootstrap";

import {Card} from "components/Card/Card.jsx";
import {FormInputs} from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import ChargingLocationService from "../services/chargingLocation.services";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDOw9FX8co2j1vwXyQehJID7ZCf9ccnttU");

class AddLocation extends Component {
    state = {
        loading: true
    };
    chargerTypes = [];
    updateLocationMode = false;
    preLoadedLocation;

    constructor(props) {
        super(props);
        // If update location, fetch state object
        if (props.match.path === '/admin/update/location') {
            this.preLoadedLocation = props.location.location.state;
            this.updateLocationMode = true;
        }

        if (!this.updateLocationMode) {
            this.state = {
                locationObject: {
                    name: "",
                    address: {
                        street: "",
                        city: "",
                        state: "",
                        postalCode: "",
                        country: ""
                    },
                    chargingUnits: [],
                    enabled: true,
                    deleted: false,
                    basicBookingFee: 0.50,
                    cancellationTimeout: 0,
                    owner: "5d2fb5270c8c3c33abfb0e72"
                }
            }
        } else {
            this.state = {
                locationObject: this.preLoadedLocation
            }
        }
        this.state.chargingUnitObj = {
            name: "",
            enabled: true,
            energyPrice: 0.0,
            charger: {
                power: 0,
                type: {
                    chargingLevel: 0,
                    connector: ""
                }
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
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
        } else if (name === 'chargerName' || name === 'energyPrice' || name === 'charger' || name === 'power') {
            // For charging unit
            if (name === 'chargerName') {
                this.setState(prevState => {
                    let chargingUnitObj = Object.assign({}, prevState.chargingUnitObj);
                    chargingUnitObj.name = value;
                    return {chargingUnitObj};

                });
            } else if (name === 'charger') {
                this.setState(prevState => {
                    let chargingUnitObj = Object.assign({}, prevState.chargingUnitObj);
                    chargingUnitObj.charger.type = JSON.parse(value); // Parsing string value back to object
                    return {chargingUnitObj}
                });
            } else if (name === 'power') {
                this.setState(prevState => {
                    let chargingUnitObj = Object.assign({}, prevState.chargingUnitObj);
                    chargingUnitObj.charger.power = value; // Parsing string value back to object
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

    saveLocation(event) {
        let addressString = this.state.locationObject.address.street +
            ', ' + this.state.locationObject.address.postalCode + ', ' + this.state.locationObject.address.city;
        Geocode.fromAddress(addressString).then(
            (response) => {
                const geoCodes = response.results[0].geometry.location;
                let geoPoint = {
                    type: 'Point',
                    coordinates: [geoCodes.lat, geoCodes.lng]
                };
                // Setting geopoints
                this.state.locationObject.geoPoint = geoPoint;
                // Call the API function
                ChargingLocationService.addLocation(this.state.locationObject).then((data) => {
                    this.props.showNotification('success', 'Added successfully');
                }).catch((err) => {
                    this.props.showNotification('error', 'Error while adding location');
                });
                event.preventDefault();
            },
            (error) => {
                this.props.showNotification('error', 'Cannot find entered address on map, please enter correct address');
            }
        );
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
                charger: {
                    power: 0,
                    type: {
                        chargingLevel: 0,
                        connector: ""
                    }
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
            let chargingUnits = [...state.locationObject.chargingUnits];
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
                                                    type: "text",
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
                                                    label: "Basic Booking Fee (€)",
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
                                                    label: "Cancellation Timeout (Hours)",
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
                                                    return <div key={index} className="row charging-units">
                                                        <div key={index+1}
                                                            className={"col-md-8"}>{value.name + ' ' + value.charger.type.connector}</div>
                                                        <div key={index+2} className={"col-md-4"}>
                                                            {this.updateLocationMode &&
                                                            <button key={index+3}
                                                                className="btn-xs btn-info btn-text-white btn-margin-15 btn-position"
                                                                >Update
                                                            </button>}
                                                            <button key={index+4}
                                                                className="btn-xs btn-danger btn-text-white btn-margin-15 btn-position"
                                                                onClick={(e) => this.onDeleteItem(e, index)}>Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                })}
                                            </Col>
                                        </Row>
                                        {this.updateLocationMode && <Button bsStyle="info" pullRight fill type="submit">
                                            Update Charging Location
                                        </Button>}

                                        {!this.updateLocationMode &&
                                        <Button bsStyle="info" pullRight fill type="button"
                                                onClick={(e) => this.saveLocation(e)}>
                                            Add Charging Location
                                        </Button>}

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
                                        <label htmlFor="charger">Type of charger</label>
                                        <select id="chargerTypeSelect" className="form-control" name="charger"
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
                                                    label: "Power (kWh)",
                                                    type: "number",
                                                    bsClass: "form-control",
                                                    placeholder: "Power (kWh)",
                                                    name: "power",
                                                    value: this.state.chargingUnitObj.charger.power,
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />
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
