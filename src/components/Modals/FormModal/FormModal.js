import React from 'react';
import {Modal} from 'react-bootstrap';
import "./FormModal.scss";


export default function FormModal(props) {
    
    const {children, titulo, show, setShow} = props;
    
    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop='static'>
            <Modal.Title>
                {titulo}
            </Modal.Title>
            <Modal.Body>
              {children}
            </Modal.Body>
        </Modal>
    )
}
