import React, {useState} from 'react';
import FormModal from "../FormModal";
import {Form, Button, FormControl, FormGroup, Spinner} from 'react-bootstrap';
import {Register} from "../../../api/login";
import {values, size} from "lodash";
import {toast} from "react-toastify";
import "./RegisterModal.scss";

export default function RegisterModal(props) {
    
    const {show, setShow} = props;

    const [form, setForm] = useState(GetInitialValues());

    const [loading, setLoading] = useState(false);
 
    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const Registrar = (e) => {
        e.preventDefault();

        let validCount = 0

        values(form).some(value => {
            value && validCount++
            return null
        })

        if(size(form) !== validCount){
            toast.error("Debes completar todos los campos")
        }else{
            setLoading(true);
            Register(form).then(res => {
                if(res){
                    toast.success("El registro se completó con éxito");
                    setLoading(false);
                    setShow(false);
                }
            }).catch(() => {
                toast.error("Ocurrió un error al registrarse");
                setLoading(false);
                setShow(false);
            }).finally(() => {
                setLoading(false);
                setShow(false);
            })
        }
    }

    return (
           <FormModal show={show} setShow={setShow}>
               <div className="register-modal">
                   <h3 className="register-modal__titulo">Registrarse</h3>
            <Form>
                <FormGroup className="register-modal__apinom">
                    <FormControl type="text" placeholder="nombre" name="nombre" onChange={onChange} defaultValue={form.nombre}/>
                    <FormControl type="text" placeholder="apellidos" name="apellidos" onChange={onChange} defaultValue={form.apellidos}/>
                </FormGroup>
                <div className="divider"></div>
                <FormGroup className="register-modal__epn">
                <FormControl type="text" placeholder="fecha de nacimiento" name="fechaNacimiento" onChange={onChange} defaultValue={form.fechaNacimiento}/>
                <FormControl type="email" placeholder="email" name="email" onChange={onChange} defaultValue={form.email}/>
                <FormControl type="password" placeholder="password" name="password" onChange={onChange} defaultValue={form.password}/>
                </FormGroup>
                <FormGroup className="register-modal__buttons">
                <Button onClick={Registrar}>{loading ? <Spinner animation="grow" variant="light"/> : "Registrar"}</Button>
                <Button onClick={() => setShow(false)}>Cancelar</Button>
                </FormGroup>
            </Form>
            </div>
       </FormModal>
      
    )

}

function GetInitialValues(){
    return {
        nombre: "",
        apellidos : "",
        email: "",
        password: "",
        fechaNacimiento: ""
    }
}