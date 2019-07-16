import React, {Component} from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import avatar from "assets/img/faces/face-3.jpg";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { TableDetails } from "components/Analytics/TableDetails.jsx";
import {
  optionsSales,
  optionsBar,
  responsiveSales,
  responsiveBar
} from "variables/Variables.jsx";

import AnalyticsService from "../services/analytics.services";


class Analytics extends Component {
    constructor(props) {
        super(props);
        this.chargerLocations = [];
        AnalyticsService.getChargerLocations()
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
      AnalyticsService.getChargerDetails(id)
      .then(res => {
        this.setState(res);
        this.tableElement.current.updateTable(res);
      })
      .catch(err => console.log('There was an error:' + err));
    }

    createLegend(json) {
      var legend = [];
      for (var i = 0; i < json["names"].length; i++) {
        var type = "fa fa-circle text-" + json["types"][i];
        legend.push(<i className={type} key={i} />);
        legend.push(" ");
        legend.push(json["names"][i]);
      }
      return legend;
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
                <div>
                <label htmlFor="chargerLocations">Choose location</label>
                <select className="form-control" onChange={this.updateUI} value={this.state.selectedLocationId}>
                    {
                        this.chargerLocations.map((x) =>
                        <option value={x.id}>
                          {x.location}
                        </option>)
                    }
                </select>
                </div>
              }
            />
            </Col>
            </Row>

            <Row>
            <Col md={12}>
            <Card
              title="Details"
              category={"Address: " + this.state.chargerLocation}
              content={
                <div className="table-full-width">
                  <table className="table">
                    <TableDetails ref={this.tableElement}/>
                  </table>
                </div>
              }
            />
            </Col>
            </Row>

            <Row>
              <Col md={6}>
              <Card
                title="Energy sold"
                category="Energy sold per day for the last 4 weeks"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataEnegry}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(this.state.chargersBar)}</div>
                }
              />
              </Col>

              <Col md={6}>
              <Card
                title="Bookings per day"
                category="Average bookings per hour in a day for the last month"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataBookings}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(this.state.chargersBar)}</div>
                }
              />
              </Col>
            </Row>

            <Row>
              <Col md={8}>
              <Card
                title="Revenue chart"
                category="Revenue chart for the last year"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataRevenue}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(this.state.chargersBar)}</div>
                }
              />

              </Col>
              <Col md={4}>
                <Card
                  title="Charge time per day"
                  category="Average charge time per day"
                  content={
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      <ChartistGraph data={this.state.dataChargeTime} type="Pie" />
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(this.state.chargersBar)}</div>
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
