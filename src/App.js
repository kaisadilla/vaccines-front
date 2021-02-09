import React from 'react';
import './App.css';
import * as ReactBootStrap from "react-bootstrap";
import CRUD from "./Components/CRUD.f";
import Home from "./Components/Home";
import DatosGlobales from "./Components/DatosGlobales";
import Navbar from "./Components/Navbar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AcData from './Components/AcData';

function App () {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/rest" component={CRUD} />
                    <Route path="/rest-test" component={AcData} />
                    <Route path="/data" component={DatosGlobales} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
