import React, {Component} from "react";
import {MenuItem, Nav, NavDropdown, NavItem} from "react-bootstrap";
import logo from "assets/img/logo.png";

class Website extends Component {
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

                <div className="jumbotron">
                    <div className="container">
                        <h1>An electric mobility platform</h1>
                        <p>We connect EV owners and EV charging providers in order to
                            extend EV usability with integrated charging
                            booking, authorization and payment</p>
                    </div>
                </div>

                <div className="row info">
                    <div className="col-md-6">
                        <h2>EV Charge Providers</h2>
                        <p>
                            <ul>
                                <li>Optimal utilization of EV Charging
                                    Locations (EVCLs) (Maximized
                                    profits)</li>
                                <li>Extensive data logging & visualization</li>
                                <li>Transparent user management &
                                    authorization</li>
                                <li>Easy administration & maintenance
                                    of EVCLs</li>
                                <li>Gain more EVO customers</li>
                                <li>Profitable placement of new EVCLs</li>
                            </ul>
                             </p>
                        <p className="col-md-offset-8"><a className="btn btn-default" href="#" role="button">Join as EVCP &raquo;</a></p>
                    </div>
                    <div className="col-md-6">
                        <h2>EV Owners</h2>
                        <p>
                            <ul>
                                <li>Easy to find suitable & available
                                    chargers</li>
                                <li>Compatibility filter for EVCLs</li>
                                <li>Transparent and reduced charging
                                    cost</li>
                                <li>Booking for charging</li>
                                <li>Integrated authorization &
                                    payment</li>
                                <li>One-click long trip planning</li>
                            </ul>
                        </p>
                        <p className="col-md-offset-8">
                            <a className="btn btn-default" href="#" role="button">Join as EVO &raquo;</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Website;
