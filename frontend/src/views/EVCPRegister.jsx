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

import UsersService from "../services/users.services";

import avatar from "assets/img/faces/face-3.jpg";

import logo from "assets/img/logo.png";

import axios from "axios";

class EVCPRegister extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      first_name: "",
      last_name: "",
      email_address: "",
      company_name: "",
      password: "",
      confirm_password: ""
    };
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

  onChangeCompanyName(e) {
    this.setState({
      company_name: e.target.value
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
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirm_password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    /* Add a notification. Add to database. Take to Sign in page */
    //this.props.history.push("/index/sign-in");
    this.props.history.location.pathname = "/index/sign-in";

    console.log(
      `The values are ${this.state.email_address} and ${this.state.password}`
    );

    const obj = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      company_name: this.company_name,
      role: "EVCP",
      email_address: this.state.email_address,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    };

    // calling API here
    UsersService.signUpEVCP(obj);

    //axios
    //.post("http://localhost:5000/backend/sign-up", obj)
    //.then(res => console.log(res.data));

    this.setState({
      first_name: "",
      last_name: "",
      email_address: "",
      password: "",
      confirm_password: ""
    });
  }

  render() {
    return (
      <div className="content evcpregisterform">
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
                    <MenuItem href="/index/evo-register" eventKey={2.1}>
                      EV Owner
                    </MenuItem>
                    <MenuItem href="/index/evcp-register" eventKey={2.2}>
                      EV Charging Provider
                    </MenuItem>
                  </NavDropdown>
                </div>
                <div className="col-md-5 nav-bar-text">
                  <NavItem eventKey={3} href="/index/sign-in">
                    Log In
                  </NavItem>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="form">
          <Grid fluid>
            <Row>
              <Col md={8}>
                <Card
                  title="EVCP Sign Up"
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
                            label: "Company",
                            type: "name",
                            bsClass: "form-control",
                            placeholder: "Company Name",
                            value: this.state.company_name,
                            onChange: this.onChangeCompanyName,
                            required: true
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-6", "col-md-6"]}
                        properties={[
                          {
                            label: "Password",
                            type: "password",
                            bsClass: "form-control",
                            placeholder: "Password",
                            value: this.state.password,
                            onChange: this.onChangePassword,
                            required: true
                          },
                          {
                            label: "Confirm password",
                            type: "tepasswordxt",
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

export default EVCPRegister;
