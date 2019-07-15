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
  constructor(props){
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          first_name: '',
          last_name: '',
          email_address: '',
          role: '',
          password: '',
          confirm_password: ''
      }
  }
  
  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }
  onChangeEmailAddress(e) {
    this.setState({
      email_address: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })  
  }
  
  onChangeConfirmPassword(e) {
    this.setState({
      confirm_password: e.target.value
    })  
  }
  
  onSubmit(e) {
    e.preventDefault();
    {/* Add a notification, Take to Sign in page */}
    console.log(`The values are ${this.state.email_address} and ${this.state.password}`)
    this.setState({
      first_name: '',
      last_name: '',
      email_address: '',
      role: '',
      password: '',
      confirm_password: ''
    })
  }
  
  
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
                    <form onSubmit={this.onSubmit}>
                      <FormInputs
                        ncols={["col-md-6", "col-md-6"]}
                        properties={[
                          {
                            label: "First Name",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "First Name",
                            defaultValue: "e.g. Elon",
                            value: this.state.first_name,
                            onChange: this.onChangeFirstName,
                            required: true
                          },
                          {
                            label: "Last Name",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Last Name",
                            defaultValue: "e.g. Musk",
                            value: this.state.last_name,
                            onChange: this.onChangeLastName,
                            required: true
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
                            placeholder: "Email",
                            value: this.state.email_address,
                            onChange: this.onChangeEmailAddress,
                            required: true
                          },
                          {
                            label: "Role",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Role",
                            defaultValue: "EVO or EVCP",
                            value: this.state.role,
                            onChange: this.onChangeRole,
                            required: true
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
                            placeholder: "Password",
                            value: this.state.password,
                            onChange: this.onChangePassword,
                            required: true
                          },
                          {
                            label: "Confirm password",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Confirm password",
                            value: this.state.confirm_password,
                            onChange: this.onChangeConfirmPassword,
                            required: true
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
