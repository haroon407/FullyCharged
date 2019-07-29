import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";

import logo from "assets/img/logo.png";
import config from "react-global-configuration";

class Sidebar extends Component {
    user = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null;

    constructor(props) {
        super(props);
        // Checking for role and redirecting if not signed in
        let configFile = config.serialize();
        if (configFile !== "null") {
            this.user = config.get('user')
        } else {
            // If the user is not signed in
            if (!this.user) {
                this.props.history.push('/index/sign-in');
            }
        }
        this.state = {
            width: window.innerWidth
        };
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    updateDimensions() {
        this.setState({width: window.innerWidth});
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        if (this.user === null) {
            return <p>Please Sign in</p>
        }
        const sidebarBackground = {
            backgroundImage: "url(" + this.props.image + ")"
        };
        return (
            <div
                id="sidebar"
                className="sidebar"
                data-color={this.props.color}
                data-image={this.props.image}
            >
                {this.props.hasImage ? (
                    <div className="sidebar-background" style={sidebarBackground}/>
                ) : (
                    null
                )}
                <div className="logo">
                    <a className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src={logo} alt="logo_image"/>
                        </div>
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {this.state.width <= 991 ? <AdminNavbarLinks/> : null}
                        {this.props.routes.map((prop, key) => {
                            if (!prop.redirect && !prop.noSideNav && prop.role === this.user.user.role)
                                return (
                                    <li
                                        className={
                                            prop.upgrade
                                                ? "active active-pro"
                                                : this.activeRoute(prop.layout + prop.path)
                                        }
                                        key={key}
                                    >
                                        <NavLink
                                            to={prop.layout + prop.path}
                                            className="nav-link"
                                            activeClassName="active"
                                        >
                                            <i className={prop.icon}/>
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            return null;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
