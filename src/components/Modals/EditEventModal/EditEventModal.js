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
import Delete from "../../../assets/svg/delete-white-36dp.svg";

import "../EventModal/EventModal.scss";

export default function EditEventModal(props) {

    const {setRefresh, evento, setShow, show} = props;
     
    const [formData, setFormData] = useState(GetEventData(evento));

    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);


    const [id, setId] = useState(evento?.id);
  
    useEffect(() => {
       setFormData(GetEventData(evento));
       setId(evento?.id)
    }, [evento])

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onModify = () => {
        setLoading(true);
        UpdateEvento(id, formData).then(res => {

            if(res){
                toast.success("Modificado con éxito");
                setLoading(false);
                setRefresh();
                setShow();
            }
           
        }).catch(err => {
            toast.error("Ocurrió un error al intentar actualizar el evento");
            setLoading(false);
            setShow();
        }).finally(() => {
            setLoading(false);
            setShow();
        })
    }

    const onDelete = () => {
        setLoadingDelete(true);
        DeleteEvento(id).then(res => {
            if(res){
            toast.success("Se ha eliminado el evento");
            setLoadingDelete(false);
            setRefresh();
            setShow();
        }
        }).catch(() => {
            toast.error("Ocurrió un error al eliminar el evento.");
            setLoadingDelete(false);
        }).finally(() => {
            setLoadingDelete(false);
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
                
            <Button onClick={onModify} disabled={loadingDelete ? true : false}>
               {loading ? <Spinner animation="border" variant="light"/> : <img src={Check} alt="ok" enabled={""}/>} 
            </Button>
            
            <Button onClick={setShow}>
               <img src={Close} alt="close"/>
            </Button>
            
            <Button onClick={onDelete} disabled={loading ? true : false}>
            {loadingDelete ? <Spinner animation="border" variant="light"/> : <img src={Delete} alt="delete" />}
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