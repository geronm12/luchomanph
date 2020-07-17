import React, {useState, useEffect} from 'react';
import {Modal, Button, FormControl, FormGroup, Form, Spinner} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import ReactTooltip  from "react-tooltip";
import {DeleteEvento,UpdateEvento} from "../../../api/eventos";
import {toast} from "react-toastify";
import {isNull, isEmpty} from 'lodash';

import Check from "../../../assets/svg/check-white-36dp.svg";
import Close from "../../../assets/svg/close-white-36dp.svg";
import "./EditEventModal.scss";

export default function EditEventModal(props) {

    const {setRefresh, evento, setShow, show} = props;
     
    const [formData, setFormData] = useState(GetEventData(evento));

    const [id, setId] = useState(evento?.id);
  
    useEffect(() => {
       setFormData(GetEventData(evento));
       setId(evento?.id)
    }, [evento])

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onModify = () => {
        UpdateEvento(id, formData).then(res => {
            console.log(res);
            toast.success("Modificado con éxito");
            setRefresh();
            setShow();
        }).catch(err => {
            toast.error("Ocurrió un error al intentar actualizar el evento");
            setShow();
        })
    }

    return (
        
        <Modal  show={show} onHide={setShow} className="event-modal">
            <Modal.Title className="event-modal__title">
                Eventos
            </Modal.Title>
            <Modal.Body className="event-modal__body"> 
                <FormGroup> <FormControl 
                type="text" 
                placeholder="Titulo del evento" 
                name="titulo" 
                defaultValue={formData.titulo}
                onChange={onChange}/> </FormGroup>
                <FormGroup className="event-modal__body__dates"> 
                <DatePicker  
                placeholder="fecha inicio"
                locale={es}
                selected={formData.fechaInicio} 
                showTimeSelect
                onChange = {date => setFormData({...formData, fechaInicio: date})}
                 /> 
                 <DatePicker  
                 placeholder="fecha fin" 
                 locale={es}
                 selected={formData.fechaFin}
                 showTimeSelect
                 onChange = {date => setFormData({...formData, fechaFin: date})}
                 /> 
                </FormGroup>
                <FormGroup className="event-modal__body__check">
                <Form.Check 
                 type='checkbox'
                 id='default-checkbox'
                 label= 'All Day'
                 data-tip= "Indica si el evento dura todo el día"
                 checked={formData.allDay}
                 onChange={() => setFormData({...formData, allDay: !formData.allDay})}
                />
                </FormGroup>
            <FormGroup className="event-modal__body__buttons">
                
            <Button onClick={onModify}>
                <img src={Check} alt="ok"/>
            </Button>
            
            <Button onClick={setShow}>
                <img src={Close} alto="close"/>
            </Button>
            </FormGroup>
            </Modal.Body>
            <ReactTooltip type="info" delayShow={1000} backgroundColor="#4E3B66"/>
        </Modal>)
}


 function GetEventData(evento){

    return {
        fechaInicio: evento?.start || new Date(Date.now()),
        fechaFin: evento?.end || new Date(Date.now()),
        titulo: evento?.title || "",
        allDay: evento?.allDay || false
    }

 }