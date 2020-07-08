import React, {useState} from "react";
import {Modal, Button, Form, Spinner} from "react-bootstrap";
import {values,size} from "lodash";
import {toast} from "react-toastify";
import {Sigin, setTokenApi} from "../../../api/login";
import "./LoginModal.scss";


export default function LoginModal (props){

    const { setRefreshLogin} = props
    
    const [formData, setFormData] = useState(initialFormValue())

    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState(true);

    function onClick(e){
        e.preventDefault()
        
        let validCount = 0

        values(formData).some(value => {
            value && validCount++
            return null
        })

        if(size(formData) !== validCount){
            toast.error("Debes completar todos los campos")
        }else{
            setLoading(true)
            Sigin(formData).then(response => {
                if(response.mensaje){
                    toast.warning(response.mensaje)
                }else{
                    setTokenApi(response.token)
                    toast.success(`Bienvenido ${formData.email}`)
                    setRefreshLogin(true)
                    setShow(false)
                    
                }
            }).catch(err =>{
                console.log(err)
                toast.error("Ocurrió un error con el servidor, inténtelo de nuevo más tarde")
            }).finally(() => {
                setLoading(false)
            })
        }

    }

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
    
        <Modal show={show}   onHide={() => setShow(false)}  size="lg" backdrop='static' keyboard={false}>
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
          <Button onClick={onClick}> 
          {loading  ? <Spinner animation="border" variant="light"/> 
          
          : 
          "Iniciar Sesión"
          }</Button> 
           
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