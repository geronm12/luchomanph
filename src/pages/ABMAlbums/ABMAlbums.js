import React from 'react';
import BasicLayout from "../../components/Layouts/BasicLayout";
import BasicConsulta from "../../components/Consulta/BasicConsulta";

export default function ABMAlbums(props) {
    const {setRefreshLogin} = props;
    return (
        <BasicLayout setRefreshLogin={setRefreshLogin}> 
        <BasicConsulta>
        </BasicConsulta>   
        </BasicLayout>
    )
}
