import React from 'react'
import BasicLayout from "../../components/Layouts/BasicLayout";
import "./Home.scss";

export default function Home(props) {

    const {setRefreshLogin} = props; 

    return (
        <BasicLayout setRefreshLogin={setRefreshLogin}>
        <div className="home">
            <h3>Hola mundo</h3>
        </div>  
        </BasicLayout>
    )
}
