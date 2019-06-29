import React, {Component} from "react";
import {Grid} from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Grid fluid>
                    <p className="copyright">
                        &copy; {new Date().getFullYear()}{" "}
                        <a href="#">
                            Fully Charged
                        </a>
                        , An electric mobility platform that connects EV owners and EV charging providers
                    </p>
                </Grid>
            </footer>
        );
    }
}

export default Footer;
