import React, {Component} from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { TableDetails } from "components/Analytics/TableDetails.jsx";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import {
  responsiveSales,
  responsiveBar
} from "variables/Variables.jsx";

import AnalyticsService from "../services/analytics.services";
import config from "react-global-configuration";


class Analytics extends Component {
    constructor(props) {
        super(props);
        this.chargerLocations = [];
        this.user = null;
        let configFile = config.serialize();
        if (configFile !== "null") {
            this.user = config.get('user')
        } else {
            // If the user is not signed in
            this.props.history.push('/index/sign-in');
        }
        AnalyticsService.getChargerLocations(this.user)
        .then(res => {
          this.chargerLocations = res;
          if (res!=null && res[0]!=null) {
            this.updateUI({target: {value: res[0].id}});
          }
        })
        .catch(err => console.log('There was an error:' + err));

        // Initializing state
        this.state = this.getEmptyState();
        this.tableElement = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUI = this.updateUI.bind(this);
    };


    handleInputChange(event) {}
    handleSubmit(event) {
        event.preventDefault();
    }

    getEmptyState(){
      return {
          selectedLocationId: 0,
          chargerNames: ["Loading.."],
          chargerLevels: ["Loading.."],
          chargerPowers: ["Loading.."],
          chargerConnectors: ["Loading.."],
          chargerCosts: ["Loading.."],

          chargerLocation: "Loading..",

          chargersBar: {
            names: ["Loading.."],
            types: ["info", "danger", "warning"]
          },

          dataEnegry: {
            labels: ["Loading.."],
            series: []
          },

          dataRevenue: {
            labels: ["Loading.."],
            series: []
          },

          dataChargeTime: {
            labels: ["Loading.."],
            series: []
          },

          dataBookings: {
            labels: ["Loading.."],
            series: []
          }
      };
    }



    updateUI(event){
      var id = event.target.value;

      this.setState(this.getEmptyState());
      AnalyticsService.getChargerDetails(id, this.user)
      .then(res => {
        this.setState(res);
        this.tableElement.current.updateTable(res);
      })
      .catch(err => console.log('There was an error:' + err));
    }

    createOptions(data){
      var min = 0;
      var max = 0;
      var arr = data.series[0];
      if (arr!=null) {
        var i;
        for (i=0; i<arr.length; i++) {
          if (min > arr[i]) {
            min = arr[i];
          }
          if (max < arr[i]) {
            max = arr[i];
          }
        }
        max = max + max/4;
      } else {
        min = 0;
        max = 800;
      }
      return {
        low: min,
        high: max,
        showArea: false,
        height: "245px",
        axisX: {
          showGrid: false
        },
        lineSmooth: true,
        showLine: true,
        showPoint: true,
        fullWidth: true,
        chartPadding: {
          right: 50
        }
      };
    }


    render() {
        return (
          <div className="content">
            <Grid fluid>
            <Row>
            <Col md={12}>
            <Card
              title="Location Analytics"
              content={
                <Row>
                <div className="col-md-12">
                <FormGroup>
                  <ControlLabel>Choose location</ControlLabel>
                  <select className="form-control" onChange={this.updateUI} value={this.state.selectedLocationId}>
                      {
                          this.chargerLocations.map((x) =>
                          <option value={x.id}>
                            {x.location}
                          </option>)
                      }
                  </select>
                </FormGroup>
                </div>
                </Row>
              }
            />
            </Col>
            </Row>
            <TableDetails ref={this.tableElement}/>
            <Row>
              <Col md={6}>
              <Card
                title="Energy sold"
                category="Average energy sold per day for the last week"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataEnegry}
                      type="Line"
                      options={this.createOptions(this.state.dataEnegry)}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
              />
              </Col>

              <Col md={6}>
              <Card
                title="Bookings"
                category="Average bookings per day for the last week"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataBookings}
                      type="Line"
                      options={this.createOptions(this.state.dataBookings)}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
              />
              </Col>
            </Row>

            <Row>
              <Col md={7}>
              <Card
                title="Revenue chart"
                category="Average revenue per month for the last year"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataRevenue}
                      type="Bar"
                      options={this.createOptions(this.state.dataRevenue)}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
              />

              </Col>
              <Col md={5}>
              <Card
                title="Charge time"
                category="Average charge time per day for the last week"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataChargeTime}
                      type="Line"
                      options={this.createOptions(this.state.dataChargeTime)}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
              />
              </Col>
            </Row>
            </Grid>
          </div>
        );
    }
}

export default Analytics;
