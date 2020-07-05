import React, {useState, useEffect} from 'react';
import {Table, ButtonToolbar, ButtonGroup, Button} from "react-bootstrap";
import {map} from "lodash";
import Buttons from "../../Buttons";
import "../Consulta.scss"; 


export default function ConsultaPosts(props) {

    const {lista, pages, setPage, setRefreshPosts} = props;

     
  
    function nextPage(){
         let newPage = pages + 1;
        setPage(newPage);
        setRefreshPosts(true);
    }

    function previousPage(){
        if (pages > 1){
        let prevPage = pages - 1;
        setPage(prevPage);
        setRefreshPosts(true);
        }
        
    }

    function onCreate(e){
        console.log(e);
    
    }

    if (!lista){
        return (
            <div className="no-data">
 
               <Button onClick={onCreate}>Crear</Button>
   
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
                <div className="button-group">
                    <Button  onClick={previousPage}>Prev</Button>
                    <Button  onClick={nextPage}>Next</Button>
                </div>
       </div>)
}
