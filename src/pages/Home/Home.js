import React, {useState, useEffect} from 'react'
import BasicLayout from "../../components/Layouts/BasicLayout";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Button} from 'react-bootstrap';
import {map} from "lodash";

import EventModal from "../../components/Modals/EventModal";

import {GetEventos} from "../../api/eventos";

import ModifiEvent from "../../components/Modals/EditEventModal";

import "./Home.scss";





export default class Home extends React.Component{

    constructor(props){
        super(props);
         
        this.state = {
            setRefreshLogin: this.props.setRefreshLogin,
            active: this.props.active,
            eventos: [], 
            month: getMonth(),
            show : false,
            refresh: false,
            showModify: false,
            evento: null
       }
  }

     ObtenerEventos(){
        GetEventos(this.state.month).then(res => {
           const data = FormatEvents(res);
           this.setState({eventos: data})
       })
   }

 
    componentWillMount(){
        this.ObtenerEventos();
    }


    componentDidMount(){
        const next = document.querySelector(".fc-next-button.fc-button.fc-button-primary");
        const prev = document.querySelector(".fc-prev-button.fc-button.fc-button-primary");
        const today = document.querySelector(".fc-today-button.fc-button.fc-button-primary");

        if(next){
            next.addEventListener('click', (e) => {
                this.setState({month: this.state.month >= 12 ? 1 : this.state.month + 1});
                this.ObtenerEventos();
            })
        }
        
        if(prev){
            prev.addEventListener('click', (e) => {
                this.setState({month: this.state.month <= 1 ? 12 : this.state.month - 1})
                this.ObtenerEventos();
            })
        }
        
        if(today){
            today.addEventListener('click', (e) => {
                this.setState({month: getMonth()})
                this.ObtenerEventos();
            })
        }
        
    }

    HandleOpen = () => this.setState({show: true});
    
    HandleClose = () => this.setState({show: false});

    HandleRefresh = () => this.setState({refresh: !this.state.refresh})

    HandleModifyOpen = () => this.setState({showModify: true});

    HandleModifyClose = () => this.setState({showModify: false});
    
    setEvento = (evento) => {
        this.setState({evento: evento.event})
        this.setState({showModify: true})
    }


    componentDidUpdate(prevProps, prevState){
        if(this.state.refresh !== prevState.refresh){
            this.ObtenerEventos();
        }
    }
        
    
    HandleDateclick(date){
        this.setState({date: date});
        this.setState({show: true})
    }

    render(){
        return (
            <BasicLayout setRefreshLogin={this.state.setRefreshLogin} active={this.state.active}>
                 <div className="home">
                <div className="header">
                    <h3>Calendario</h3>
               </div>
                    <div className="calendario">
                    <FullCalendar
                        plugins={[ dayGridPlugin,interactionPlugin]}
                        height={"90vh"}
                        editable={false}
                        events={this.state.eventos}
                        locales = "esLocale"
                        locale = "es"
                        eventClick={(event) => this.setEvento(event)}
                        selectable={true}
                        dateClick={(e) => this.HandleDateclick(e.date)}
                       />
                       <EventModal  show={this.state.show} setShow={this.HandleClose} setRefresh={this.HandleRefresh} date={this.state.date}/>
                       <ModifiEvent  show={this.state.showModify} evento = {this.state.evento} setShow={this.HandleModifyClose} setRefresh={this.HandleRefresh}/>
                    </div>
               </div>
            </BasicLayout>
        )
    }




}

function getMonth(){
    const date = new Date().getMonth();

    return date + 1;

}

function FormatEvents(eventos, setEventos){

    const events = [];

    map(eventos, (evento, index) => {
        const eventoNuevo = {
            id: evento._id,
            title: evento.titulo,
            start: evento.fechaInicio,
            end: evento.fechaFin,
            allDay: evento.allDay,
            
        }

        events.push(eventoNuevo)
    })
    
    return events;
}