import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/website.css";
import "./assets/css/register.css";
import "./assets/css/signin.css";
import "./assets/css/bookings.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import WebsiteLayout from "layouts/Website.jsx";

import RootContext from "RootContext"; 

ReactDOM.render(
  <RootContext>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/index" render={props => <WebsiteLayout {...props} />} />
        <Redirect from="/" to="/index" />
      </Switch>
    </BrowserRouter>
  </RootContext>,

  // <Provider>
  //   <Consumer>
  //     <AdminLayout />
  //   </Consumer>
  // </Provider>,
  document.getElementById("root")
);
