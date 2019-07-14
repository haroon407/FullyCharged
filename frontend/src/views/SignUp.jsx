import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  MenuItem,
  Nav,
  NavDropdown,
  NavItem
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import SignUpService from "../services/signup.services";

import avatar from "assets/img/faces/face-3.jpg";

import logo from "assets/img/logo.png";

class SignUp extends Component {
  render() {
    return (
      <div className="content">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <img className="navbar-img" src={logo} alt="logo_image" />
              </a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <div className="navbar-form navbar-right nav-bar-register">
                <div className="col-md-7 nav-bar-text">
                  <NavDropdown
                    eventKey={2}
                    title="Register"
                    id="basic-nav-dropdown-right"
                  >
                    <MenuItem eventKey={2.1}>EV Owner</MenuItem>
                    <MenuItem eventKey={2.2}>EV Charging Provider</MenuItem>
                  </NavDropdown>
                </div>
                <div className="col-md-5 nav-bar-text">
                  <NavItem eventKey={3} href="#">
                    Log In
                  </NavItem>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div>
          <Grid fluid>
            <Row>
              <Col md={8}>
                <Card
                  title="Sign Up"
                  content={
                    <form>
                      <FormInputs
                        ncols={["col-md-6", "col-md-6"]}
                        properties={[
                          {
                            label: "First Name",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "First Name",
                            defaultValue: "e.g. Elon"
                          },
                          {
                            label: "Last Name",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Last Name",
                            defaultValue: "e.g. Musk"
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-6", "col-md-6"]}
                        properties={[
                          {
                            label: "Email address",
                            type: "email",
                            bsClass: "form-control",
                            placeholder: "Email"
                          },
                          {
                            label: "Role",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Role",
                            defaultValue: "EVO or EVCP"
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-6", "col-md-6"]}
                        properties={[
                          {
                            label: "Password",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Password"
                          },
                          {
                            label: "Confirm password",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Confirm password"
                          }
                        ]}
                      />
                      <Button bsStyle="info" pullRight fill type="submit">
                        Sign Up
                      </Button>
                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default SignUp;
