import React, {useState, useEffect} from 'react';
import {Table} from "react-bootstrap";
import {map} from "lodash";

export default function BasicConsulta(props) {

    const {lista} = props;

    
    return (
        <Table striped bordered hover variant="dark">
             <tr>
            <th>FECHA</th>
            <th>CARPETA</th>
            <th>TITULO</th>
            <th>CANT FOTOS</th>
            </tr>
            {map(lista,(objeto, index)=> (
              <tr>
                <th>{lista.fecha ? lista.fecha : lista.fechaCreacion}</th>
                <th>{lista.carpeta}</th>
                <th>lista.titulo</th>
                <th>lista.fotos.length</th>
              </tr>
            ))}
       </Table>


    )
}
