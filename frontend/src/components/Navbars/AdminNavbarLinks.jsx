import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={3} href="/index">
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
