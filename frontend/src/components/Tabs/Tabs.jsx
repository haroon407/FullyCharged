import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";

export class Tabs extends Component {
  constructor(props) {
    super(props);
    // Initializing state
    this.state = {
      updated: false
    };

    this.updateTable = this.updateTable.bind(this);
  }

  updateTable() {
    this.setState({
      updated: false
    });
  }

  render() {
    return (
      <Row>
        <Col md={8}>
          <Card
            title="Users Behavior"
            category="24 Hours performance"
            content={
              <div className="content">
                <p>
                  <a
                    class="btn btn-primary"
                    data-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Link with href
                  </a>
                  <button
                    class="btn btn-primary"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Button with data-target
                  </button>
                </p>
                <div className="content" class="collapse" id="collapseExample">
                  asd
                </div>
              </div>
            }
          />
        </Col>
      </Row>
    );
  }
}

export default Tabs;
