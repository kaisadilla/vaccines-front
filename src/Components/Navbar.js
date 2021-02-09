import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <nav class="k-navbar">
                <Link className="k-nav-item" to="/home">Página principal</Link>
                <Link className="k-nav-item" to="/rest">Información</Link>
                <Link className="k-nav-item" to="/rest-test">AC</Link>
                <Link className="k-nav-item" to="/data">Datos globales</Link>
            </nav>
        );
    }
}

/*class Navbar extends React.Component {
    render() {
        return (
            <div>
                <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="danger" variant="dark" className="owo">
                    <ReactBootStrap.Navbar.Toggle />
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <Link to="/home">
                                <ReactBootStrap.Nav.Link href="#home">Página principal</ReactBootStrap.Nav.Link>
                            </Link>
                            <Link to="/rest">
                                <ReactBootStrap.Nav.Link href="#rest">Información</ReactBootStrap.Nav.Link>
                            </Link>
                            <Link to="/data">
                                <ReactBootStrap.Nav.Link href="#data">Datos globales</ReactBootStrap.Nav.Link>
                            </Link>
                        </ReactBootStrap.Nav>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Navbar>
            </div>
        );
    }
}*/

export default Navbar;