import React, {useState, useEffect} from 'react';
import BasicLayout from "../../components/Layouts/BasicLayout";
import Consulta from "../../components/Consulta/ConsultaAlbums";
import {GetAlbums} from "../../api/albums";

export default function ABMAlbums(props) {
    const {setRefreshLogin} = props;
 
    const [albums, setAlbums] = useState(null);

    const [refreshAlbums, setRefreshAlbums] = useState(false);

    const [page, setPage] = useState(1);

    useEffect(() => {
        GetAlbums(page).then(response => {
           setAlbums(response)
        }).catch(err => {
            setAlbums(null);
       })

    },[refreshAlbums, page])

 
    return (
        <BasicLayout setRefreshLogin={setRefreshLogin}> 
        <Consulta setRefreshAlbums={setRefreshAlbums} lista={albums} setPage={setPage} pages={page}/>
        </BasicLayout>
    )
}
