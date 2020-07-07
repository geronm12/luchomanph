import React from 'react'
import BasicLayout from "../../components/Layouts/BasicLayout";
import  Camara from "../../assets/png/Camara.png"
import {Image} from "react-bootstrap";
import "./Home.scss";

export default function Home(props) {

    const {setRefreshLogin, active} = props; 

    return (
        <BasicLayout setRefreshLogin={setRefreshLogin} active={active}>
        <div className="home">
        <h2><a href="https://www.instagram.com/luchomanph/">@Luchomanph</a></h2>
        <Image src={Camara} fluid ></Image>
        </div>  
        </BasicLayout>
    )
}
