import React, { useState, useEffect } from 'react';
import axios from "axios";
import swal from "sweetalert";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Flags from '../Logic/Flags';


// "ac" stands for "autonomous community".
function AcData () {
    const REST_URL = "http://localhost:40006/vaccines/";

    const [acData, setAcData] = useState([]);
    const [form_insert, setForm_insert] = useState(false);
    const [form_edit, setForm_edit] = useState(false);
    const [form_delete, setForm_delete] = useState(false);
    const [chosenAc, setChosenAc] = useState({
        id: "",
        name: "",
        vaccinesPfizer: "",
        vaccinesModerna: "",
        vaccinesZeneca: "",
        vaccinesUsed: "",
        peopleTotal: "",
    });

    useEffect(() => {
        rest_getAllAC();
    }, []); // pass an empty array OR ELSE

    function handleChange (evt) {
        const {name, value} = evt.target;
        setChosenAc(prevState => ({
            ...prevState, [name]: value
        }));
    }

    function _getAcFromState () {
        return {
            name: chosenAc.name,
            vaccinesPfizer: chosenAc.vaccinesPfizer,
            vaccinesModerna: chosenAc.vaccinesModerna,
            vaccinesZeneca: chosenAc.vaccinesZeneca,
            vaccinesUsed: chosenAc.vaccinesUsed,
            peopleTotal: chosenAc.peopleTotal,
        };
    }

    async function rest_getAllAC() {
        await axios.get(REST_URL)
            .then(res => setAcData(res.data))
            .catch(console.log("There was an error retrieving acData."));
    }

    async function rest_insertAC () {
        const ac = _getAcFromState();

        await axios.post(REST_URL, ac)
            .then(() => {
                swal("¡Perfecto!", "Comunidad autónoma insertada.", "success");
                toggleForm_insert();
                rest_getAllAC();
            })
            .catch(err => console.log(err));
    }

    async function rest_updateAC () {
        const ac = _getAcFromState();

        await axios.put(REST_URL + chosenAc.id, ac)
            .then(() => {
                swal("¡Perfecto!", "Comunidad autónoma editada.", "success");
                toggleForm_edit();
                rest_getAllAC();
            })
            .catch(err => console.log(err));
    }

    async function rest_deleteAC () {
        await axios.delete(REST_URL + chosenAc.id)
            .then(res => {
                if (res) {
                    swal("¡Perfecto!", "Comunidad autónoma destruida", "success");
                    toggleForm_delete();
                    rest_getAllAC();
                }
            })
            .catch(err => console.log(err));
    }

    function toggleForm_insert () {
        setForm_insert(!form_insert);
    }

    function toggleForm_edit () {
        setForm_edit(!form_edit);
    }

    function toggleForm_delete () {
        setForm_delete(!form_delete);
    }

    function _selectAc (ac, action) {
        setChosenAc(ac);
        if (action === "edit") {
            toggleForm_edit();
        }
        else if (action === "delete") {
            toggleForm_delete();
        }
    }

    function _buildAcDataRows () {
        const rows = [];
        for (let ac of acData) {
            rows.push(
                <tr key={ac.id}>
                    <td className="highlight">
                        <img className="icon" src={Flags.getFlag(ac.id)} />
                        <span>{ac.name}</span>
                        </td>
                    <td>{ac.vaccinesPfizer.toLocaleString("en-us")}</td>
                    <td>{ac.vaccinesModerna.toLocaleString("en-us")}</td>
                    <td>{ac.vaccinesZeneca.toLocaleString("en-us")}</td>
                    <td className="highlight">{(ac.vaccinesPfizer + ac.vaccinesModerna + ac.vaccinesZeneca).toLocaleString("en-us")}</td>
                    <td>{ac.vaccinesUsed.toLocaleString("en-us")}</td>
                    <td>{ac.peopleTotal.toLocaleString("en-us")}</td>
                    <td>
                        <button className="k-btn k-btn-primary" onClick={() => _selectAc(ac, "edit")}>Editar</button>
                        <button className="k-btn k-btn-danger" onClick={() => _selectAc(ac, "delete")}>Borrar</button>
                    </td>
                </tr>
            );
        }
        return rows;
    }

    return (
        <main className="k-main-page">
            <table className="ac-data">{console.log("WARNING WARNING WARNING WARNING")}
                <thead>
                    <tr>
                        <td rowSpan="2">Nombre</td>
                        <td className="group" colSpan="4">Vacunas</td>
                        <td rowSpan="2">Administradas</td>
                        <td rowSpan="2">P. completa</td>
                        <td rowSpan="2">Acciones</td>
                    </tr>
                    <tr className="divisions">
                        <td>Pfizer</td>
                        <td>Moderna</td>
                        <td>Zeneca</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    {_buildAcDataRows()}
                </tbody>
                <tfoot>
                    {acData.length > 0 && (
                        <tr>
                            <td colSpan="8">
                            <button className="k-btn k-btn-primary" onClick={toggleForm_insert}>+ Insertar</button>
                            </td>
                        </tr>
                    )}
                </tfoot>
            </table>

            <Modal isOpen={form_insert}>
                <ModalHeader>Editar comunidad autónoma</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <input type="text" className="form-control" name="name" onChange={handleChange}/>

                        <label>Vacunas (Pfizer): </label>
                        <input type="text" className="form-control" name="vaccinesPfizer" onChange={handleChange}/>

                        <label>Vacunas (Moderna): </label>
                        <input type="text" className="form-control" name="vaccinesModerna" onChange={handleChange}/>

                        <label>Vacunas (Zeneca): </label>
                        <input type="text" className="form-control" name="vaccinesZeneca" onChange={handleChange}/>

                        <label>Vacunas usadas: </label>
                        <input type="text" className="form-control" name="vaccinesUsed" onChange={handleChange}/>

                        <label>Pautas completas: </label>
                        <input type="text" className="form-control" name="peopleTotal" onChange={handleChange}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="k-btn k-btn-primary" onClick={rest_insertAC}>Insertar</button>
                    <button className="k-btn k-btn-danger" onClick={toggleForm_insert}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={form_edit}>
                <ModalHeader>Editar comunidad autónoma</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <input type="text" className="form-control" name="name" onChange={handleChange} value={chosenAc.name}/>

                        <label>Vacunas (Pfizer): </label>
                        <input type="text" className="form-control" name="vaccinesPfizer" onChange={handleChange} value={chosenAc.vaccinesPfizer}/>

                        <label>Vacunas (Moderna): </label>
                        <input type="text" className="form-control" name="vaccinesModerna" onChange={handleChange} value={chosenAc.vaccinesModerna}/>

                        <label>Vacunas (Zeneca): </label>
                        <input type="text" className="form-control" name="vaccinesZeneca" onChange={handleChange} value={chosenAc.vaccinesZeneca}/>

                        <label>Vacunas usadas: </label>
                        <input type="text" className="form-control" name="vaccinesUsed" onChange={handleChange} value={chosenAc.vaccinesUsed}/>

                        <label>Pautas completas: </label>
                        <input type="text" className="form-control" name="peopleTotal" onChange={handleChange} value={chosenAc.peopleTotal}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="k-btn k-btn-primary" onClick={rest_updateAC}>Modificar</button>
                    <button className="k-btn k-btn-danger" onClick={toggleForm_edit}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={form_delete}>
                <ModalBody>
                    ¿Estás seguro de que quieres destruir {chosenAc.name}? Esta acción no se puede revertir, y puede tener consecuencias diplomáticas internacionales.
                </ModalBody>
                <ModalFooter>
                    <button className="k-btn k-btn-danger" onClick={rest_deleteAC}>Destruir</button>
                    <button className="k-btn k-btn-primary" onClick={toggleForm_delete}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </main>
    );
}

export default AcData;