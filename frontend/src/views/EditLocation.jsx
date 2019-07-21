import {createBrowserHistory} from 'history';
import React, {Component} from "react";
import {
    Grid,
    Row,
    Col,
    Table
} from "react-bootstrap";
import {Card} from "components/Card/Card.jsx";

import ChargingLocationService from "../services/chargingLocation.services";
import config from "react-global-configuration";

class EditLocation extends Component {
    state = {
        loading: true,
        locations: []
    };
    user = null;

    constructor(props) {
        super(props);
        let configFile = config.serialize();
        if (configFile !== "null") {
            this.user = config.get('user')
        } else {
            // If the user is not signed in
            this.props.history.push('/index/sign-in');
        }
    };

    history = createBrowserHistory();

    componentWillMount() {
        if (this.user !== null) {
            ChargingLocationService.getAllLocations(this.user).then((data) => {
                this.setState(() => {
                    const locations = data;
                    return {
                        locations,
                    }
                });
                this.setState({loading: false});
            });
        }
    }

    onToggleDisableItem = (e, locationId) => {
        this.setState(prevState => {
            let locations = [...prevState.locations];
            let index = this.getLocationFromId(locationId, locations);
            locations[index].enabled = !locations[index].enabled;
            locations[index].chargingUnits.forEach((unit) => {
                unit.enabled = !unit.enabled
            });
            let updatedLocation = locations[index];
            ChargingLocationService.updateLocation(updatedLocation, this.user).then(() => {
                this.props.showNotification('success', 'Location disabled successfully');
            }).catch((e) => {
                this.props.showNotification('error', 'Error while disabling the location');
            })
            return {
                locations,
            };
        });
    };

    onDeleteItem = (e, locationId) => {
        this.setState(prevState => {
            let locations = [...prevState.locations];
            let index = this.getLocationFromId(locationId, locations);
            let updatedLocation = {};
            locations[index].deleted = true;
            updatedLocation = locations[index];
            ChargingLocationService.updateLocation(updatedLocation, this.user).then(() => {
                this.props.showNotification('success', 'Location deleted successfully');
            }).catch((e) => {
                this.props.showNotification('error', 'Error while deleting the location');
            })
            return {
                locations,
            };
        });
    };

    onEditItem = (location) => {
        // let origin = window.location.origin;
        // window.location.href = origin + '/admin/update/location'
        this.history.push('/update/location', location);
        this.props.history.push(this.history);
        this.props.history.location.pathname = '/admin/update/location';
        // this.props.history.push('/update/location');
    };

    getLocationFromId(locationId, locationsList) {
        return locationsList.findIndex((location) => {
            return location._id === locationId
        });
    }

    render() {
        if (this.loading || this.user === null) {
            return 'Loading...'
        }
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Charging Location Management"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <tbody>
                                        {this.state.locations.map((location, key) => {
                                            return (!location.deleted &&
                                                <tr key={key}>
                                                    <td key={location._id}>
                                                        <Row className="location-cell">
                                                            <Col
                                                                md={8}>{location.name} - {location.address.street}, {location.address.city}, {location.address.postalCode} {location.address.country}
                                                                {!location.enabled &&
                                                                <b className="margin-disabled">(DISABLED)</b>}
                                                            </Col>
                                                            <Col md={4}>{
                                                                <button
                                                                    className="btn-xs btn-primary btn-text-white btn-margin-15 btn-position"
                                                                    onClick={() => this.onEditItem(location)}
                                                                    disabled={!location.enabled}>Edit
                                                                </button>
                                                            }
                                                                <button
                                                                    className={"btn-xs btn-text-white btn-margin-15 btn-position " + (location.enabled ? "btn-warning" : "btn-success")}
                                                                    onClick={(e) => this.onToggleDisableItem(e, location._id)}>
                                                                    {!location.enabled && <span>Enable</span>}
                                                                    {location.enabled && <span>Disable</span>}
                                                                </button>
                                                                <button
                                                                    className="btn-xs btn-danger btn-text-white btn-margin-15 btn-position"
                                                                    onClick={(e) => this.onDeleteItem(e, location._id)}>Delete
                                                                </button>
                                                            </Col>
                                                        </Row>
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default EditLocation;
