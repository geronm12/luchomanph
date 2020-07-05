import React from 'react';
import {ButtonToolbar, ButtonGroup, Button, Overlay, OverlayTrigger} from "react-bootstrap";
import "./Buttons.scss";
import ReactTooltip  from "react-tooltip";



export default function  Buttons() {
    return (
       <div className="actions">
        <Button data-tip="Crear">
        C
        </Button>
        <Button data-tip="Modificar">
        M
        </Button>
        <Button data-tip="Eliminar">
        E
        </Button>
        <Button data-tip="Agregar foto">
        F
        </Button>
        <ReactTooltip type="info" delayShow={1000} backgroundColor="#4E3B66"/>
       </div>
    )
       
}
