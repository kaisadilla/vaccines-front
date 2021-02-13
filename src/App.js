import React from 'react';
import './App.css';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AcData from './Views/AcData';
import GlobalData from './Views/GlobalData';

function App () {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/rest" component={AcData} />
                    <Route path="/data" component={GlobalData} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
