import React, {useState, useEffect} from 'react';
import BasicLayout from "../../components/Layouts/BasicLayout";
import Consulta from "../../components/Consulta/ConsultaAlbums";
import {GetAlbums} from "../../api/albums";

export default function ABMAlbums(props) {
    const {setRefreshLogin} = props;
 
    const [albums, setAlbums] = useState(null);

    const [refreshAlbums, setRefreshAlbums] = useState(false);


    useEffect(() => {
        GetAlbums(1).then(response => {
           console.log(response)
           setAlbums(response)
       }).catch(err => {
            setAlbums(null);
       })

    },[refreshAlbums])





    return (
        <BasicLayout setRefreshLogin={setRefreshLogin}> 
        <Consulta setRefreshAlbums={setRefreshAlbums}/>
        </BasicLayout>
    )
}
