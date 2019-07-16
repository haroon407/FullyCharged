import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export class TableDetails extends Component {

  constructor(props) {
      super(props);
      // Initializing state
      this.state = {
          chargerNames: this.props.chargerNames,
          chargerLevels: this.props.chargerLevels,
          chargerPowers: this.props.chargerPowers,
          chargerConnectors: this.props.chargerConnectors,
          chargerCosts: this.props.chargerCosts
      };
  };

  render() {

    // TODO: Set this variables according to loaded data
    // var chargerNames = ["Charger 1", "Charger 2", "Charger 3"];
    // var chargerLevels = ["Level 1", "Level 2", "Level 3"];
    // var chargerPowers = ["1.92 kW", "9.6 kW", "50.0 kW"];
    // var chargerConnectors = ["Port J1772", "Tesla HPWC", "SAE Combo CCS"];
    // var chargerCosts = ["0.11", "0.15", "0.16"];

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
    }
    return <tbody>
    <tr>
      <td><b>Name</b></td>
      <td><b>Level</b></td>
      <td><b>Power</b></td>
      <td><b>Connector</b></td>
      <td><b>Cost</b></td>
    </tr>
    {tasks}
    </tbody>;
  }
}

export default TableDetails;
