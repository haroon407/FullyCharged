import React, {Component} from "react";
import {
    Grid,
    Row,
    Col,
    MenuItem,
    Nav,
    NavDropdown,
    NavItem
} from "react-bootstrap";

import {Card} from "components/Card/Card.jsx";
import {FormInputs} from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import UsersService from "../services/users.services";


import logo from "assets/img/logo.png";


class EVCPRegister extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        };
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

    signUp(e) {
        // perform all neccassary validations
        if (this.state.password !== this.state.confirm_password) {
            alert("Passwords don't match");
        } else {
            // make API call
            const obj = {
                name: this.state.name,
                role: "EVCP",
                email: this.state.email,
                password: this.state.password
            };

            // calling API here
            UsersService.signUpEVCP(obj).then(() => {
                alert('Registered successfully, please sign in to continue');
                this.props.history.push('/index/sign-in');
            }).catch((error) => {
                alert('Error signingup, please try again');
            });
        }
        this.setState({
            name: "",
            email: "",
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
                                <img className="navbar-img" src={logo} alt="logo_image"/>
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
                                    title="EV Charging Provider Sign Up"
                                    content={
                                        <form onSubmit={this.onSubmit}>
                                            <FormInputs
                                                ncols={["col-md-12"]}
                                                properties={[
                                                    {
                                                        label: "Name",
                                                        type: "text",
                                                        bsClass: "form-control",
                                                        placeholder: "First Name",
                                                        defaultValue: "e.g. Elon",
                                                        value: this.state.name,
                                                        onChange: this.onChangeName,
                                                        required: true
                                                    }
                                                ]}
                                            />
                                            <FormInputs
                                                ncols={["col-md-12"]}
                                                properties={[
                                                    {
                                                        label: "Email address",
                                                        type: "email",
                                                        bsClass: "form-control",
                                                        placeholder: "Email",
                                                        value: this.state.email_address,
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
                                            <Button bsStyle="info" pullRight fill type="button"
                                                    onClick={(e) => this.signUp(e)}>
                                                Sign Up
                                            </Button>
                                            <div className="clearfix"/>
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
