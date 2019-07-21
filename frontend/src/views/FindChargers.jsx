import React, {Component} from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { Map, Marker, InfoWindow, GoogleApiWrapper  } from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';

import FormInputs from "components/FormInputs/FormInputs";
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton.jsx";
import InfoWindowEx from "components/Map/InfoWindowEx.jsx";

import FindChargersService from "../services/findChargers.services";
import MakeBookingService from "../services/makeBooking.services";
import config from "react-global-configuration";

const mapStyles = {
  width: '91%',
  height: '50vh',
  margin: '15px 15px'
};
const mapContainerStyle = {
  width: '90%',
  height: '65vh',
};
const mapContainerStyle2 = {
  width: '97%',
  height: '65vh',
};

class FindChargers extends Component {
    constructor(props) {
        super(props);

        this.mapLoaded = false;
        this.state = {
          mapPosition: {
            lat: 48.25653029401251,
            lng: 11.633186874796593
          },
          chargers: [],
          activeMarker: {},
          markerName: "Marker",
          showingInfoWindow: false
        };

        this.user = null;
        let configFile = config.serialize();
        if (configFile !== "null") {
            this.user = config.get('user')
        } else {
            // If the user is not signed in
            this.props.history.push('/index/sign-in');
        }

        FindChargersService.getData(48.25653029401251, 11.633186874796593, 48.27181450576806, 11.713309822489464, '2019-07-24', 10, this.user).then(res => {
          console.log(res);
          this.setState({
            mapPosition: {
              lat: 48.25653029401251,
              lng: 11.633186874796593
            },
            chargers: res,
            activeMarker: {},
            markerName: "Marker",
            showingInfoWindow: false
          });
        }).catch(err => console.log('There was an error:' + err));

        this.availableHours = ["10.00", "11.00", "12.00", "13.00",
        "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00", "00.00", "01.00",
      "02.00", "03.00", "04.00", "05.00", "06.00", "07.00", "08.00", "09.00"];

        this.setCurrentPosition = this.setCurrentPosition.bind(this);
        this.displayMarkers = this.displayMarkers.bind(this);
        this.handleMapIdle = this.handleMapIdle.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.bookNow = this.bookNow.bind(this);
        this.displayInfoShow = this.displayInfoShow.bind(this);

        this.onPlaceSelected = this.onPlaceSelected.bind(this);

    };

    handleMapIdle(){
      console.log("Map loaded");
      if (this.mapLoaded == false) {
        this.mapLoaded = true;
        this.setCurrentPosition();
      }
    }

    setCurrentPosition() {
      // console.log("Loading current pos");
      // if(navigator.geolocation) {
      //   console.log("Loading current pos: success");
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     var pos = {
      //       lat: position.coords.latitude,
      //       lng: position.coords.longitude
      //     },
      //     this.state.currentPosition = pos;
      //
      //     // this.setState({ center: pos })
      //   });
      // }
    }

    onMarkerClick(props, marker, e) {
      console.log("onMarkerClick: " + marker.name);
      this.setState({
        mapPosition: {
          lat: 48.25653029401251,
          lng: 11.633186874796593
        },
        markerName: marker.name,
        activeMarker: marker,
        showingInfoWindow: true
      });

      // FindChargersService.getData(this.user).then(res => {
      //   console.log(res);
      // }).catch(err => console.log('There was an error:' + err));
    }


    displayMarkers(){
      var child = [];
      var i;
      for (i=0; i<this.state.chargers.length; i++) {
        let element = (<Marker key={i} id={this.state.chargers[i].id} name={this.state.chargers[i].name} position={{
          lat: this.state.chargers[i].latitude,
          lng: this.state.chargers[i].longitude
        }}
        onClick={this.onMarkerClick}/>);
        child.push(element);
      }
      return child;
    }

    bookNow(){
      console.log("Trying to book");
      this.props.history.push('/admin/make_booking');
      // event.preventDefault();
    }

    displayInfoShow(){
      return (<Table>
        <tbody>
        <tr>
        <td><b>Charger:</b></td>
        <td>{this.state.markerName}</td>
        </tr>
        <tr>
        <td><b>Time:</b></td>
        <td>10.00-16.00</td>
        </tr>
        <tr><td colSpan="2"><center><Button bsStyle="info" fill type="submit" onClick={this.bookNow}>
          Book Now
        </Button></center></td></tr>
        </tbody>

      </Table>);
    }

    onPlaceSelected(place){

      let pos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      console.log("Pos: " + pos.lat + ", " + pos.lng);
      FindChargersService.getData(48.25653029401251, 11.633186874796593, (pos.lat+0.2), (pos.lng-0.2), '2019-07-24', 10, this.user).then(res => {
        console.log(res);
      }).catch(err => console.log('There was an error:' + err));
      this.setState({
        mapPosition: pos,
        activeMarker: {},
        markerName: "marker",
        showingInfoWindow: false
      });
    	}

      render() {
        return (<div className="content">
          <Grid fluid>
          <Row className="margin_bottom">
          </Row>
          <Row>
          <Col md={12}>
          <Card
            title="Location Analytics"
            content={
              <div className="content">
              <Row>
                    <div className="col-md-6">
                    <FormGroup>
                      <ControlLabel>Location</ControlLabel>
                      <Autocomplete
                        style={{
                          width: '100%',
                          height: '40px'
                        }}
                        onPlaceSelected={ this.onPlaceSelected }
                        types={['(regions)']}/>
                    </FormGroup>
                    </div>
                    <div className="col-md-3">
                    <FormGroup>
                      <ControlLabel>Date</ControlLabel>
                      <FormControl {...{
                        type: "text",
                        bsClass: "form-control",
                        value: "21/08/2019"
                      }}/>
                    </FormGroup>
                    </div>

                    <div className="col-md-3">
                    <FormGroup>
                      <ControlLabel>Time</ControlLabel>
                      <select className="form-control">
                          {
                              this.availableHours.map((x) => <option>
                                  {x}
                              </option>)
                          }
                      </select>
                    </FormGroup>
                    </div>
                    </Row>
                    <Row>
                      <Col md={12}>
                      <Map
                                              google={this.props.google}
                                              zoom={10}
                                              style={mapContainerStyle2}
                                              showsUserLocation = {true}
                                              onIdle={this.handleMapIdle}
                                              center={this.state.mapPosition}
                                              initialCenter={this.state.mapPosition} >

                                              {this.displayMarkers()}

                                              <InfoWindowEx
                                                marker={this.state.activeMarker}
                                                visible={this.state.showingInfoWindow}>
                                                  {this.displayInfoShow()}
                                              </InfoWindowEx>
                                            </Map>
                      <Card
                        content={
                          <div className="ct-chart" style={mapStyles}>

                          </div>
                        }
                      />
                      </Col>
                    </Row>
                    </div>
            }
          />
          </Col>
          </Row>
          </Grid>
        </div>);
      }
}


const WrappedContainer = GoogleApiWrapper({
   apiKey: 'AIzaSyDOw9FX8co2j1vwXyQehJID7ZCf9ccnttU'
})(FindChargers);
export default WrappedContainer;
