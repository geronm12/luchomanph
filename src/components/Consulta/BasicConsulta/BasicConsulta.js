import React, {useState, useEffect} from 'react';
import {Table, ButtonToolbar, ButtonGroup, Button} from "react-bootstrap";
import {map} from "lodash";
import Buttons from "../../Buttons";
 
export default function BasicConsulta(props) {

    const {lista, pages, setPage, setRefreshPosts, setRefreshAlbums} = props;

    const botones = [1,2,3]


    
    function nextPage(){
         let newPage = pages + 1;
        setPage(newPage);
        setRefreshPosts(true);
        setRefreshAlbums(true);
    }

    function previousPage(){
        if (pages > 1){
        let prevPage = pages - 1;
        setPage(prevPage);
        setRefreshPosts(true);
        setRefreshAlbums(true);
        }
        
    }
    
    return (
        <Table striped bordered hover variant="dark">
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
            {map(lista,(objeto, index)=> (
                
                <tr key={objeto._id}>
                <th>{objeto.fecha ? objeto.fecha : objeto.fechaCreacion}</th>
                <th>{objeto.carpeta}</th>
                <th>{objeto.titulo}</th>
                <th>{objeto.fotos.length}</th>
                <th><Buttons/></th>
                
              </tr>
            ))}
            </tbody>
            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-2" aria-label="First group">
                    <Button  onClick={previousPage}>Prev</Button>
                    <Button  onClick={nextPage}>Next</Button>
                </ButtonGroup>
            </ButtonToolbar>
       </Table>

    )
}
