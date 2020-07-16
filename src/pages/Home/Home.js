import React, {useState, useEffect} from 'react'
import BasicLayout from "../../components/Layouts/BasicLayout";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Button} from 'react-bootstrap';
import {map} from "lodash";

import {GetEventos} from "../../api/eventos";

import "./Home.scss";





export default class Home extends React.Component{

    constructor(props){
        super(props);
       
        this.state = {
            setRefreshLogin: this.props.setRefreshLogin,
            active: this.props.active,
            eventos: [], 
            month: getMonth()
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

    
    render(){
        return (
            <BasicLayout setRefreshLogin={this.state.setRefreshLogin} active={this.state.active}>
                <div className="home">
                    <div className="calendario">
                    <FullCalendar
                        plugins={[ dayGridPlugin,interactionPlugin ]}
                        height={"90vh"}
                        editable={false}
                        events={this.state.eventos}
                        locales = "esLocale"
                        locale = "es"
                        eventClick={(event) => alert(event.event.title + " termina " + event.event.end)}
                       />
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