import React, {useState, useEffect} from 'react';
import {Table, Button} from "react-bootstrap";
import {map} from "lodash";
import moment from "moment";
import localization from "moment/locale/es";

import Buttons from "../../Buttons";
import FormModal from "../../Modals/FormModal";
import {AltaAlbums} from "../../ABM/ABMAlbums/ABMAlbums";
import Next from "../../../assets/svg/navigate_next-white-24dp.svg";
import Back from "../../../assets/svg/navigate_before-white-24dp.svg";


import "../Consulta.scss";
import ReactTooltip from "react-tooltip";

export default function ConsultaAlbums(props) {

    const {lista, pages, setPage,  setRefreshAlbums} = props;
    const [show, setShow] = useState(false);

    function nextPage(){
         let newPage = pages + 1;
         setRefreshAlbums(true);
         setPage(newPage);
    }

    function previousPage(){
        if (pages > 1){
        let prevPage = pages - 1;
        setPage(prevPage);
         setRefreshAlbums(true);
        }
        
    }

    function showModal(){
        setShow(true);
    }
   
   
    if (!lista){
        return (
            <CrearButton show={show} showModal={showModal} setShow={setShow} setRefreshAlbums={setRefreshAlbums}/>
        )
    }
   
  
    return (
        <div>
               <CrearButton show={show} showModal={showModal} setShow={setShow} setRefreshAlbums={setRefreshAlbums} />
            <Table striped bordered hover className="tabla">
            <thead>
              <tr>
            <th>Fecha</th>
            <th>Carpeta</th>
            <th>Titulo</th>
            <th>Total fotos</th>
            <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
          
            {map(lista,(objeto)=> (
             <tr key={objeto._id}>
                <th>{moment(objeto.fecha ? objeto.fecha : objeto.fechaCreacion).locale("es", localization).format("L")}</th>
                <th>{objeto.carpeta}</th>
                <th>{objeto.titulo}</th>
                <th>{objeto.fotos.length}</th>
                <th><Buttons entidad={objeto} setRefreshAlbums={setRefreshAlbums}/></th>
             </tr>
            ))}
            </tbody>
          
       </Table>
                 <div className="button-group">
                    <Button  onClick={previousPage}><img src={Back}/></Button>
                    <Button  onClick={nextPage}><img src={Next}/></Button>
                </div>
            <ReactTooltip type="info" delayShow={1000} backgroundColor="#4E3B66"/>
       </div>
    )
}


function CrearButton(props){

    const {show, showModal, setShow, setRefreshAlbums} = props;

    return <div className="no-data">
           <Button data-tip="Crear" onClick={showModal}>Crear</Button>
            <FormModal show={show} setShow={setShow}>
             <AltaAlbums setShow={setShow} setRefreshAlbums={setRefreshAlbums}/>
            </FormModal>
            </div>
}