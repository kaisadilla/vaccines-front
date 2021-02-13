import React from 'react';
//para trabajar con imagenes
//primero la tengo que importar de dnde esta
import VaccineSp from "../img/vaccine-sp.png";

class Home extends React.Component {
    render() {
        return (
            <div className="background">
                <img src={VaccineSp} />
            </div>
        );
    }
}

export default Home;