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
import logo from "assets/img/logo.png";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import { withContext } from "../AppContext";

import UsersService from "../services/users.services";

import avatar from "assets/img/faces/face-3.jpg";
import { isContext } from "vm";

import axios from "axios";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeEmailAddress(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    alert("A form was submitted: " + this.state);

    //Use below line of code
    //this.props.showNotification("success", "Logged in successfully");
    
    //this.props
    //.login(this.state) // calling login function of Context
    // .then(() => this.props.history.push("/index")); //admin/dashboard-evo

    this.clearInputs();
    //{
    /* Add Role based Auth */
    //}
    console.log(
      `The values are ${this.state.email_address} and ${this.state.password}`
    );

    //const obj = {
    //email: this.state.email,
    //password: this.state.password
    //};
    //axios
    //.post("http://localhost:5000/backend/sign-in", obj)
    //.then(res => console.log(res.data));

    // calling API here
    //let result = UsersService.signIn(obj).then(data => {
    //Context.user = data
    //});

    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    return (
      <div className="content loginform">
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
                  title="Sign In"
                  content={
                    <form onSubmit={this.onSubmit}>
                      <FormInputs
                        ncols={["col-md-6", "col-md-6"]}
                        properties={[
                          {
                            label: "Email address",
                            type: "email",
                            name: "email",
                            bsClass: "form-control",
                            placeholder: "email",
                            value: this.state.email,
                            onChange: this.onChangeEmailAddress,
                            required: true
                          },
                          {
                            label: "Password",
                            type: "password",
                            name: "password",
                            bsClass: "form-control",
                            placeholder: "password",
                            value: this.state.password,
                            onChange: this.onChangePassword,
                            required: true
                          }
                        ]}
                      />
                      <Button bsStyle="info" pullRight fill type="submit">
                        Sign In
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

//export default withContext(SignIn);
export default SignIn;
