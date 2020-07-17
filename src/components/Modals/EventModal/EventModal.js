import React, {useState} from 'react';
import {Modal, Button, FormControl, FormGroup, Form, Spinner} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import ReactTooltip  from "react-tooltip";
import {CreateEvento} from "../../../api/eventos";
import {toast} from "react-toastify";
import {isNull, isEmpty} from 'lodash';

import Check from "../../../assets/svg/check-white-36dp.svg";
import Close from "../../../assets/svg/close-white-36dp.svg";

import "./EventModal.scss";

export default function EventModal(props){

    const {show, setShow, setRefresh,date} = props;
 
    const [formData, setFormData] = useState(getInitialData(date));
  

    const CrearEvento = () => {

        const today = new Date(Date.now());

        if(formData.fechaInicio < today || formData.fechaFin < today){
            toast.error(`Las fechas no pueden ser menores a ${today}`)
            return;
        }

        if(isEmpty(formData.titulo)){
            toast.error("El titulo es obligatorio");
            return;
        }

        CreateEvento(formData).then(response => {
            setRefresh();
            setFormData(getInitialData());
            setShow();
        })
    }

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const  HandleClose = ()=> {
        setFormData(getInitialData());
        setShow();
    }

    return (
        
        <Modal  show={show} onHide={setShow} className="event-modal">
            <Modal.Title className="event-modal__title">
                Eventos
                {console.log(formData)}
            </Modal.Title>
            <Modal.Body className="event-modal__body"> 
                <FormGroup> <FormControl 
                type="text" 
                placeholder="Titulo del evento" 
                name="titulo" 
               
                onChange={onChange}/> </FormGroup>
                <FormGroup className="event-modal__body__dates"> 
                <DatePicker  
                placeholder="fecha inicio"
                locale={es}
                selected={date} 
                showTimeSelect
                onChange = {date => setFormData({...formData, fechaInicio: date})}
                 /> 
                 <DatePicker  
                 placeholder="fecha fin" 
                 locale={es}
                 selected={date}
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
                
            <Button onClick={CrearEvento}>
                <img src={Check} alt="ok"/>
            </Button>
            
            <Button onClick={HandleClose}>
                <img src={Close} alto="close"/>
            </Button>
            </FormGroup>
            </Modal.Body>
            <ReactTooltip type="info" delayShow={1000} backgroundColor="#4E3B66"/>
        </Modal>)
}


function getInitialData(date){

    const today = new Date(Date.now());

    return {
        fechaInicio: today,
        fechaFin: today,
        titulo: "",
        allDay: false
    }
}