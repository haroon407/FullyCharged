import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";

export class TableDetails extends Component {

  constructor(props) {
      super(props);
      // Initializing state
      this.state = {
          chargerNames: [],
          chargerLevels: [],
          chargerPowers: [],
          chargerConnectors: [],
          chargerCosts: []
      };

      this.updateTable = this.updateTable.bind(this);
  };

  updateTable(res){

    this.setState({
        chargerLocation: res.chargerLocation,
        chargerNames: res.chargerNames,
        chargerLevels: res.chargerLevels,
        chargerPowers: res.chargerPowers,
        chargerConnectors: res.chargerConnectors,
        chargerCosts: res.chargerCosts
    });
  }

  render() {
    var tasks = [];
    if (this.state.chargerNames != null) {
      for (var i = 0; i < this.state.chargerNames.length; i++) {
        tasks.push(
          <tr>
            <td>{this.state.chargerNames[i]}</td>
            <td>{this.state.chargerLevels[i]}</td>
            <td>{this.state.chargerPowers[i]}</td>
            <td>{this.state.chargerConnectors[i]}</td>
            <td>{this.state.chargerCosts[i]}</td>
          </tr>
        );
      }
      return <Row>
      <Col md={12}>
      <Card
        title="Details"
        category={"Address: " + this.state.chargerLocation}
        content={
          <div className="table-full-width">
            <table className="table">
            <tbody>
            <tr>
              <td><b>Name</b></td>
              <td><b>Level</b></td>
              <td><b>Power</b></td>
              <td><b>Connector</b></td>
              <td><b>Cost</b></td>
            </tr>
            {tasks}
            </tbody>
            </table>
          </div>
        }
      />
      </Col>
      </Row>;
    } else {
      return null;
    }
  }
}



export default TableDetails;
