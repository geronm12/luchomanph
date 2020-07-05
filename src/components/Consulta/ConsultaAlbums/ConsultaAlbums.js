import React, {useState, useEffect} from 'react';
import {Table, ButtonToolbar, ButtonGroup, Button} from "react-bootstrap";
import {map} from "lodash";
import Buttons from "../../Buttons";
import "../Consulta.scss";

export default function ConsultaAlbums(props) {

    const {lista, pages, setPage,  setRefreshAlbums} = props;
 
    function nextPage(){
         let newPage = pages + 1;
        setPage(newPage);
    
        setRefreshAlbums(true);
    }

    function previousPage(){
        if (pages > 1){
        let prevPage = pages - 1;
        setPage(prevPage);
       
        setRefreshAlbums(true);
        }
        
    }
   
   
    if (!lista){
        return (
            <div className="no-data">
              <Button>Crear</Button>
           </div>
        )
    }
  
    return (
        <div>
            
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
                <th>{objeto.fecha ? objeto.fecha : objeto.fechaCreacion}</th>
                <th>{objeto.carpeta}</th>
                <th>{objeto.titulo}</th>
                <th>{objeto.fotos.length}</th>
                <th><Buttons/></th>
             </tr>
            ))}
            </tbody>
          
       </Table>
       <ButtonToolbar aria-label="Toolbar with button groups" className="button-group">
                <ButtonGroup className="mr-2" aria-label="First group">
                    <Button  onClick={previousPage}>Prev</Button>
                    <Button  onClick={nextPage}>Next</Button>
                </ButtonGroup>
            </ButtonToolbar>
       </div>
    )
}
