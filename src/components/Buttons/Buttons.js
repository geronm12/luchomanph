import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import "./Buttons.scss";
import ReactTooltip  from "react-tooltip";
import FormModal from '../Modals/FormModal';
import {AltaAlbums, ModificaAlbums, EliminaAlbums} from '../ABM/ABMAlbums/ABMAlbums';

export default function  Buttons() {

    const [show, setShow] = useState(false);
    

    return (
       <div className="actions">
       
        <Button data-tip="Modificar">
        M
        </Button>
        <FormModal show={false}>
        <ModificaAlbums/>         
        </FormModal>
        <Button data-tip="Eliminar">
        E
        </Button>
        <FormModal show={false}>
        <EliminaAlbums/>
        </FormModal>
        <Button data-tip="Agregar foto">
        F
        </Button>
        <ReactTooltip type="info" delayShow={1000} backgroundColor="#4E3B66"/>
       </div>
    )
       
}
