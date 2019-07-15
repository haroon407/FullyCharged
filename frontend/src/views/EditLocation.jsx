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

class EditLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {
                    _id: '1132',
                    name: "A location 1",
                    address: {
                        street: "xyz",
                        city: "Munich",
                        state: "Bavaria",
                        postalCode: 12345,
                        country: "Deutschland"
                    },
                    chargingUnit: [{
                        name: "unit 1",
                        enabled: true,
                        energyPrice: 0.4,
                        chargerType: {
                            chargingLevel: 'level 1',
                            power: 220,
                            connector: "ADC"
                        }
                    },
                    {
                        name: "unit 2",
                        enabled: true,
                        energyPrice: 0.5,
                        chargerType: {
                            chargingLevel: 'level 3',
                            power: 420,
                            connector: "ADC Super"
                        }
                    }],
                    enabled: true,
                    basicBookingFee: 0.34,
                    cancellationTimeout: 120
                },
                {
                    _id: '13123',
                    name: "A location 2",
                    address: {
                        street: "asdas",
                        city: "Berlin",
                        state: "Berlin state",
                        postalCode: 12312,
                        country: "Deutschland"
                    },
                    chargingUnit: [{
                        name: "unit 3",
                        enabled: true,
                        energyPrice: 0.4,
                        chargerType: {
                            chargingLevel: 'level 2',
                            power: 220,
                            connector: "Some level 2"
                        }
                    },
                    {
                        name: "unit 4",
                        enabled: true,
                        energyPrice: 0.5,
                        chargerType: {
                            chargingLevel: 'level 1',
                            power: 420,
                            connector: "JKH common"
                        }
                    }],
                    enabled: true,
                    basicBookingFee: 0.24,
                    cancellationTimeout: 120
                },
                {
                    _id: '432434',
                    name: "A location 3",
                    address: {
                        street: "xyz",
                        city: "Cologne",
                        state: "Cologne state",
                        postalCode: 4535,
                        country: "Deutschland"
                    },
                    chargingUnit: [{
                        name: "unit 5",
                        enabled: true,
                        energyPrice: 0.4,
                        chargerType: {
                            chargingLevel: 'level 4',
                            power: 220,
                            connector: "ADC asdsd"
                        }
                    },
                    {
                        name: "unit 6",
                        enabled: true,
                        energyPrice: 0.5,
                        chargerType: {
                            chargingLevel: 'level 5',
                            power: 420,
                            connector: "ADC Super asd"
                        }
                    }],
                    enabled: true,
                    basicBookingFee: 0.24,
                    cancellationTimeout: 20
                }
            ]
        };
    };

    history = createBrowserHistory();

    onToggleDisableItem = (e, locationId) => {
        this.setState(prevState => {
            let locations = [...prevState.locations];
            let index = this.getLocationFromId(locationId, locations)
            locations[index].enabled = !locations[index].enabled;
            locations[index].chargingUnit.forEach((unit)=>{
                unit.enabled = !unit.enabled
            });
            return {
                locations,
            };
        });
    };

    onDeleteItem = (e, locationId) => {
        this.setState(prevState => {
            let locations = [...prevState.locations];
            let index = this.getLocationFromId(locationId, locations)
            locations.splice(index, 1);
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
        return locationsList.findIndex((location)=>{
            return location._id === locationId
        });
    }

    render() {
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
                        return (
                          <tr key={key}>
                              <td key={location._id}>
                                  <Row className="location-cell">
                                      <Col md={8}>{location.name} - {location.address.street}, {location.address.city}, {location.address.postalCode} {location.address.country}
                                      {!location.enabled && <b className="margin-disabled">(DISABLED)</b>}
                                      </Col>
                                      <Col md={4}>
                                          <button className="btn-xs btn-primary btn-text-white btn-margin-15 btn-position"
                                           onClick={() => this.onEditItem(location)}>Edit</button>
                                          <button className={"btn-xs btn-text-white btn-margin-15 btn-position " + (location.enabled ? "btn-warning" : "btn-success")}
                                              onClick={(e) => this.onToggleDisableItem(e, location._id)}>
                                                  {!location.enabled && <span>Enable</span>}
                                                  {location.enabled && <span>Disable</span>}
                                              </button>
                                            <button className="btn-xs btn-danger btn-text-white btn-margin-15 btn-position"
                                              onClick={(e) => this.onDeleteItem(e, location._id)}>Delete</button>
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
