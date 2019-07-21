import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Grid, Row, Col, Collapse } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

export class MyTest extends Component {
  constructor(props) {
    super(props);
    // Initializing state
    this.state = {
      open: false
    };

    this.setOpen = this.setOpen.bind(this);
  }

  setOpen(val) {
    let state = {
      open: val
    };

    this.setState(state);
  }

  render() {
    return (
      <div>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </div>
        </Collapse>
      </div>
    );
  }
}

export default MyTest;
