import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor () {
        super();
        this.state = {
            chosenPath: 0,
        };
    }
    
    render() {
        return (
            <nav className="k-navbar">
                <Link className={`k-nav-item ${this.state.chosenPath === 0 && "selected"}`} onClick={() => this.setState({chosenPath: 0})} to=""     >Página principal</Link>
                <Link className={`k-nav-item ${this.state.chosenPath === 1 && "selected"}`} onClick={() => this.setState({chosenPath: 1})} to="/rest">Información</Link>
                <Link className={`k-nav-item ${this.state.chosenPath === 2 && "selected"}`} onClick={() => this.setState({chosenPath: 2})} to="/data">Datos globales</Link>
            </nav>
        );
    }
}

export default Navbar;