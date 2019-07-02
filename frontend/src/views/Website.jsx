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
                        <h1>Hello, world!</h1>
                        <p>This is a template for a simple marketing or informational website. It includes a large
                            callout
                            called a jumbotron and three supporting pieces of content. Use it as a starting point to
                            create
                            something more unique.</p>
                        <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
                    </div>
                </div>

                <div className="row info">
                    <div className="col-md-4">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                            tortor
                            mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
                            magna
                            mollis euismod. Donec sed odio dui. </p>
                        <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                    </div>
                    <div className="col-md-4">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                            tortor
                            mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
                            magna
                            mollis euismod. Donec sed odio dui. </p>
                        <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                    </div>
                    <div className="col-md-4">
                        <h2>Heading</h2>
                        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum
                            id
                            ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                            condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                        <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Website;
