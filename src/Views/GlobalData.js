import React, { useState, useEffect } from 'react';
import axios from "axios";
import FactBoard from '../Components/FactBoard';
import VaccineLogo from "../img/vaccine-logo.png";

function GlobalData () {
    const REST_URL = "http://localhost:40006/vaccines/";

    const [acData, setAcData] = useState([]);

    useEffect(() => {
        rest_getAllAC();
    }, []);

    async function rest_getAllAC () {
        await axios.get(REST_URL)
            .then(res => setAcData(res.data))
            .catch(console.log("There was an error retrieving acData."));
    }

    function calcTotalVaccines () {
        return acData.reduce((acc, val) => acc + val.vaccinesPfizer + val.vaccinesModerna + val.vaccinesZeneca, 0).toLocaleString("en-us");
    }

    function calcUsedVaccines () {
        return acData.reduce((acc, val) => acc + val.vaccinesUsed, 0).toLocaleString("en-us");
    }

    function calcPeopleTotal () {
        return acData.reduce((acc, val) => acc + val.peopleTotal, 0).toLocaleString("en-us");
    }

    function calcMaxVaccines () {
        return acData.reduce((acc, val) => {
            if (!acc) return {
                name: val.name,
                value: val.vaccinesPfizer + val.vaccinesModerna,
            }
            else if (acc.value < val.vaccinesPfizer + val.vaccinesModerna) return {
                name: val.name,
                value: val.vaccinesPfizer + val.vaccinesModerna,
            }
            else return acc;
        }, null);
    }

    function calcMaxUsedVaccines () {
        return acData.reduce((acc, val) => {
            if (!acc) return {
                name: val.name,
                value: val.vaccinesUsed,
            }
            else if (acc.value < val.vaccinesUsed) return {
                name: val.name,
                value: val.vaccinesUsed,
            }
            else return acc;
        }, null);
    }

    function calcMaxPeopleTotal () {
        return acData.reduce((acc, val) => {
            if (!acc) return {
                name: val.name,
                value: val.peopleTotal,
            }
            else if (acc.value < val.peopleTotal) return {
                name: val.name,
                value: val.peopleTotal,
            }
            else return acc;
        }, null);
    }

    return (
        <main className="k-main-page">
            {acData.length > 0 && (
                <div className="vaccine-FACTS">
                    <FactBoard logo={VaccineLogo} factName="Dosis distribuidas" factValue={calcTotalVaccines()} factMax={calcMaxVaccines()}/>
                    <FactBoard logo={VaccineLogo} factName="Dosis administradas" factValue={calcUsedVaccines()} factMax={calcMaxUsedVaccines()}/>
                    <FactBoard logo={VaccineLogo} factName="Pauta completa" factValue={calcPeopleTotal()} factMax={calcMaxPeopleTotal()}/>
                </div>
            )}
        </main>
    );
}

export default GlobalData;