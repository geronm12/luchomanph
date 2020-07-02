import React, {useState} from "react";
import {Modal, Button, Form, Spinner} from "react-bootstrap";
import "./LoginModal.scss";


export default function LoginModal (props){

    const {show, setShowModal} = props
    
    const [formData, setFormData] = useState(initialFormValue())

    const [loading, setLoading] = useState(false)

    function onClick(e){
        e.preventDefault()
        

    }

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
    
        <Modal show={show}  size="sm">
        <Modal.Title>
            <h3>Login</h3>
        </Modal.Title>
        <Modal.Body>
           <Form.Group>
            <Form.Control type="email" name="email" placeholder="Correo Electrónico" defaultValue={formData.email} onChange={onChange}>
           </Form.Control>
           </Form.Group>
           <Form.Group>
            <Form.Control type="password" name="password" placeholder="Contraseña" defaultValue={formData.password} onChange={onChange}>
           </Form.Control>
        </Form.Group>
           <Form.Group className="button-div">
           <Button onClick={onClick}>Ingresar</Button>
           
        </Form.Group>
        </Modal.Body>
        </Modal>
     
    )



}

function initialFormValue(){
    return {
        "email": "",
        "password": ""
    }
}