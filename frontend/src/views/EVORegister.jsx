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
import VehicleModelsService from "../services/vehiclemodels.services";
import { createBrowserHistory } from "history";

import avatar from "assets/img/faces/face-3.jpg";

import logo from "assets/img/logo.png";

import axios from "axios";

class EVORegister extends Component {
  state = {
    loading: true
  };
  vehicleModels = [];
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      vehicleModel: "",
      password: "",
      confirm_password: ""
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangeVehicleModel = this.onChangeVehicleModel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    VehicleModelsService.getVehicleModels().then(data => {
      this.vehicleModels = data;
      this.setState({ loading: false });
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmailAddress(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeVehicleModel(e) {
    this.setState({
      vehicleModels: e.target.value
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
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
    if (this.state.password !== this.state.confirm_password) {
      alert("Passwords don't match"); //Add notification
    } else {
      // make API call
      const obj = {
        //name: this.state.first_name + this.state.last_name,
        name: this.state.name,
        role: "EVO",
        email: this.state.email,
        vehicleModels: this.state.vehicleModels,
        password: this.state.password
      };
      // calling API here
      UsersService.signUpEVO(obj);
      /* Add a notification. Add to database. Take to Sign in page */
    //this.props.history.push("/index/sign-in");
    this.props.history.location.pathname = "/index/sign-in";
    console.log(
      `The values are ${this.state.email} and ${this.state.password}`
    );}
    this.setState({
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    });
  }

  render() {
    if (this.loading) {
      return "Loading...";
    }
    return (
      <div className="content evoregisterform">
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
                  title="EV Owner Sign Up"
                  content={
                    <form onSubmit={this.onSubmit}>
                      <FormInputs
                        ncols={["col-md-12"]}
                        properties={[
                          {
                            label: "Name",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Name",
                            defaultValue: "e.g. Elon Musk",
                            value: this.state.name,
                            onChange: this.onChangeName,
                            required: true
                          }
                        ]}
                      />

                      <label htmlFor="vehicleModels">Vehicle Model</label>
                      <select
                        id="Select"
                        className="form-control"
                        name="vehicleModel"
                        placeholder="Select your Models"
                        onChange={this.handleInputChange}
                      >
                        {this.vehicleModels.map((x, value) => (
                          <option key={x._id} value={JSON.stringify(x)}>
                            {x.manufacturer} {x.name}
                          </option>
                        ))}
                      </select>
                      <FormInputs
                        ncols={["col-md-12"]}
                        properties={[
                          {
                            label: "Email address",
                            name: "email",
                            type: "email",
                            bsClass: "form-control",
                            placeholder: "Email",
                            value: this.state.email,
                            onChange: this.onChangeEmailAddress,
                            required: true
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        properties={[
                          {
                            label: "Password",
                            name: "password",
                            type: "password",
                            bsClass: "form-control",
                            placeholder: "Password",
                            value: this.state.password,
                            onChange: this.onChangePassword,
                            required: true
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        properties={[
                          {
                            label: "Confirm password",
                            type: "password",
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

export default EVORegister;
