import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import {style} from "variables/Variables.jsx";
import routes from "routes.js";
import config from "react-global-configuration";

class Admin extends Component {

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
                this.props.history.push('/sign-in');
            }
        }
        this.state = {
            _notificationSystem: null,
            // image: image,
            image: null,
            color: "black",
            hasImage: true,
            fixedClasses: "dropdown show-dropdown open"
        };
    }

    showNotification = (level, message) => {
        this.state._notificationSystem.addNotification({
            title: <span data-notify="icon" className="pe-7s-info"/>,
            message: (
                <div>
                    {message}
                </div>
            ),
            level: level,
            position: 'tr',
            autoDismiss: 15
        });
    };

    componentDidMount() {
        this.setState({_notificationSystem: this.refs.notificationSystem});
        var _notificationSystem = this.refs.notificationSystem;
    }

    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={props => (
                            <prop.component
                                {...props}
                                showNotification={this.showNotification}
                            />
                        )}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    getBrandText = path => {
        for (let i = 0; i < routes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    routes[i].layout + routes[i].path
                ) !== -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    componentDidUpdate(e) {
        if (
            window.innerWidth < 993 &&
            e.history.location.pathname !== e.location.pathname &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
        }
        if (e.history.action === "PUSH") {
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.mainPanel.scrollTop = 0;
        }
    }

    render() {
        return (
            <div className="wrapper">
                <NotificationSystem ref="notificationSystem" style={style}/>
                <Sidebar
                    {...this.props}
                    routes={routes}
                    image={this.state.image}
                    color={this.state.color}
                    hasImage={this.state.hasImage}
                />
                <div id="main-panel" className="main-panel" ref="mainPanel">
                    <AdminNavbar
                        {...this.props}
                        brandText={this.getBrandText(this.props.location.pathname)}
                    />
                    <Switch>{this.getRoutes(routes)}</Switch>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Admin;
