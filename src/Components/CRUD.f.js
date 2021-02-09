
//npm i bootstrap reactstrap axios sweetalert
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
//libreria para mejorar los alert   https://sweetalert.js.org/guides/
//npm install sweetalert --save
import swal from 'sweetalert';
function CRUD() {
    //direccion de la API
    const baseUrl="http://localhost:40006/vaccines/";
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
      id: "",
      name: "",
      vaccinesPfizer: "",
      vaccinesModerna: "",
      vaccinesUsed: "",
      peopleTotal: ""
    });
  
    const handleChange=e=>{
      const {name, value}=e.target;
      setFrameworkSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
      }))
      //console.log(frameworkSeleccionado);
    }
  
    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }
  
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  
    const peticionGet=async()=>{
      
     
      await axios.get(baseUrl)
      .then(response=>{
        setData(response.data);
        //console.log(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }//peticionGet
  
    const peticionPost=async()=>{
      const usuario={
        name: frameworkSeleccionado.name,
        vaccinesPfizer: frameworkSeleccionado.vaccinesPfizer,
        vaccinesModerna: frameworkSeleccionado.vaccinesModerna,
        vaccinesUsed: frameworkSeleccionado.vaccinesUsed,
        peopleTotal: frameworkSeleccionado.peopleTotal
      };
      
      await axios.post(baseUrl, usuario)
      .then(response=>{
       
        //cerramos la ventana modal
        abrirCerrarModalInsertar();
        //refresco la tabla haciendo una peticion get
        peticionGet();
        
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPost
  
    const peticionPut=async()=>{
      // we ain't doin' nothin' if we ain't puttin' no good values.
      if (isNaN(frameworkSeleccionado.vaccinesPfizer) ||
          isNaN(frameworkSeleccionado.vaccinesModerna) ||
          isNaN(frameworkSeleccionado.vaccinesUsed) ||
          isNaN(frameworkSeleccionado.peopleTotal)) {
        return
      }
      
      const usuario={
        name: frameworkSeleccionado.name,
        vaccinesPfizer: frameworkSeleccionado.vaccinesPfizer,
        vaccinesModerna: frameworkSeleccionado.vaccinesModerna,
        vaccinesUsed: frameworkSeleccionado.vaccinesUsed,
        peopleTotal: frameworkSeleccionado.peopleTotal
      };
      console.log(baseUrl+frameworkSeleccionado.id);
      console.log(usuario);
      await axios.put(baseUrl+frameworkSeleccionado.id,usuario)
      .then(response=>{
        if (response.data!=null)
        {
          swal("Buen trabajo!","Registro Modificado Satisfactoriamente","success");
         
          abrirCerrarModalEditar();
           //refresco la tabla haciendo una peticion delete
           peticionGet();
        }  
       
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPut
  
    const peticionDelete=async()=>{
     
      axios.delete(baseUrl+"/"+frameworkSeleccionado.id).then(response=>{
      if (response.data!=null)
      {
        swal("Buen trabajo!","Registro Borrado Satisfactoriamente","success");
        abrirCerrarModalEliminar();
         //refresco la tabla haciendo una peticion delete
         peticionGet();
      }
      
       
      }).catch(error=>{
        console.log(error);
       
      })
    }//peticionDelete
  
    const seleccionarFramework=(framework, caso)=>{
      setFrameworkSeleccionado(framework);
  
      (caso==="Editar")?
      abrirCerrarModalEditar():
      abrirCerrarModalEliminar()
    }
  
    useEffect(()=>{
      peticionGet();
    },[])
  
    return (
      <div style={{textAlign: 'center'}}>
  <br />
        <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
        <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Vacunas (Pfizer)</th>
            <th>Vacunas (Moderna)</th>
            <th>Vacunas totales</th>
            <th>Administradas</th>
            <th>Pauta completa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {/*console.log(data[0])*/}
          {data.map(framework=>(
            <tr key={framework.id}>
              {/*console.log(framework.first_name)*/}
              <td><b>{framework.name}</b></td>
              <td>{framework.vaccinesPfizer.toLocaleString('en-US')}</td>
              <td>{framework.vaccinesModerna.toLocaleString('en-US')}</td>
              <td>{(framework.vaccinesPfizer + framework.vaccinesModerna).toLocaleString('en-US')}</td>
              <td>{framework.vaccinesUsed.toLocaleString('en-US')}</td>
              <td>{framework.peopleTotal.toLocaleString('en-US')}</td>
              
            <td>
            <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}>Editar</button> 
            <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
            </td>
            </tr>
          ))}
  
  
        </tbody> 
  
      </table>
  
  
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Usuarios</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="name" onChange={handleChange}/>
            <br />
            <label>Vacunas (Pfizer): </label>
            <br />
            <input type="text" className="form-control" name="vaccinesPfizer" onChange={handleChange}/>
            <br />
            <label>Vacunas (Moderna): </label>
            <br />
            <input type="text" className="form-control" name="vaccinesModerna" onChange={handleChange}/>
            <br />
            <label>Vacunas usadas: </label>
            <br />
            <input type="text" className="form-control" name="vaccinesUsed" onChange={handleChange}/>
            <br />
            <label>Pautas completas: </label>
            <br />
            <input type="text" className="form-control" name="peopleTotal" onChange={handleChange}/>
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter>
          
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Usuarios</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="name" onChange={handleChange} value={frameworkSeleccionado.name}/>
            <br />
            <label>Vacunas (Pfizer): </label>
            <br />
            <input type="text" className="form-control" name="vaccinesPfizer" onChange={handleChange} value={frameworkSeleccionado.vaccinesPfizer}/>
            <br />
            <label>Vacunas (Moderna): </label>
            <br />
            <input type="text" className="form-control" name="vaccinesModerna" onChange={handleChange} value={frameworkSeleccionado.vaccinesModerna}/>
            <br />
            <label>Vacunas usadas: </label>
            <br />
            <input type="text" className="form-control" name="vaccinesUsed" onChange={handleChange} value={frameworkSeleccionado.vaccinesUsed}/>
            <br />
            <label>Pautas completas: </label>
            <br />
            <input type="text" className="form-control" name="peopleTotal" onChange={handleChange} value={frameworkSeleccionado.peopleTotal}/>
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEliminar}>
          <ModalBody>
          ¿Estás seguro que deseas eliminar al Usuario {frameworkSeleccionado && frameworkSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()} >
              No
            </button>
          </ModalFooter>
        </Modal>
  
      </div>
    );
  }
  
  export default CRUD;