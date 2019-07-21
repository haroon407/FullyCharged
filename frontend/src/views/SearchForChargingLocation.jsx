import React from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { compose, withProps } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import FormInputs from "components/FormInputs/FormInputs";
import Card from "components/Card/Card";

const ChargingLocationsMap = compose(
  withProps({
    googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDOw9FX8co2j1vwXyQehJID7ZCf9ccnttU",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom = { props.zoom }
    defaultCenter = { props.center }
    options={{
      disableDefaultUI: true,
      scrollwheel: true
    }}
  >
  </GoogleMap>
)

class SearchForChargingLocation extends React.PureComponent {
  state = {
    zoom: 12,
    center: {
      lat: 40.137154,
      lng: 11.576124
    }
  }

  componentDidMount() {
    this.setCurrentPosition()
  }

  setCurrentPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        this.setState({ center: pos })
      })
    }
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
           <Col md={12}>
            <Card
              title = "Search for charger"
              content = {
                <div>
                <form name="search_location">
                <FormInputs
                  ncols={["col-md-6", "col-md-2", "col-md-2", "col-md-2"]}
                  properties={[
                    {
                      label: "LOCATION",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Location Name"
                    },
                    {
                      label: "DATE",
                      type: "date",
                      bsClass: "form-control",
                      // placeholder: ""
                    },
                    {
                      label: "START TIME",
                      type: "number",
                      bsClass: "form-control",
                      min: 0,
                      max: 23
                    },
                    {
                      label: "MAX PRICE (eur/kWh)",
                      type: "number",
                      step: 0.01,
                      min: 0,
                      bsClass: 'form-control'
                    }
                  ]}
                />
                
              </form>
              <ChargingLocationsMap 
                      zoom = { this.state.zoom }
                      center = { this.state.center }
              />
              </div>
              }
              />
            </Col>
          </Row>
          <Row>
              <Col md={12}>
              
              </Col>
          </Row>
        </Grid>
      </div>
      // <ChargingLocationsMap
      //   zoom = { this.state.zoom }
      //   center = { this.state.center }
      // />
    )
  }
}
export default SearchForChargingLocation;
