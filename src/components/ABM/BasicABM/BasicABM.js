import React from 'react';
import {Button} from "react-bootstrap";


export default function BasicABM(props) {

    const {children} = props;

    return (
        <div>
            {children}
            <Button>
            GUARDAR
            </Button>
            <Button>
             SALIR
            </Button>
        </div>
    )
}
