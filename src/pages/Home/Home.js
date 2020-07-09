import React from 'react'
import BasicLayout from "../../components/Layouts/BasicLayout";
import  Camara from "../../assets/png/Camara.png"
import {Image} from "react-bootstrap";
import "./Home.scss";

export default function Home(props) {

    const {setRefreshLogin, active} = props; 

    const array = ["Luciano argañaraz palma", "Innova", "Inventa", "Ejecuta"]

    return (
        <BasicLayout setRefreshLogin={setRefreshLogin} active={active}>
        <div className="home">
          
        </div>  
        </BasicLayout>
    )
}
