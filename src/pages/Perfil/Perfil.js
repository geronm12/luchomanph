import React from 'react'
import BasicLayout from "../../components/Layouts/BasicLayout";

export default function Perfil(props) {
    const {setRefreshLogin} = props;
    return (
        <BasicLayout setRefreshLogin={setRefreshLogin}>
        <div>
            <h3>Perfil</h3>
        </div>  
        </BasicLayout>
    )
}
