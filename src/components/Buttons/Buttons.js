import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import "./Buttons.scss";
import ReactTooltip  from "react-tooltip";
import FormModal from '../Modals/FormModal';
import Photo from "../Photo";
import { ModificaAlbums, EliminaAlbums} from '../ABM/ABMAlbums/ABMAlbums';
import {ModificaPosts, EliminaPosts} from "../ABM/ABMPosts/ABMPosts";


import Delete from "../../assets/png/outline_delete_black_36dp.png";
import Edit  from "../../assets/png/outline_edit_black_36dp.png";
import Foto from "../../assets/png/outline_collections_black_36dp.png";


export default function Buttons(props) {


    const {entidad, setRefreshAlbums, setRefreshPosts} = props;

    const [show, setShow] = useState(false);
    
    const [showDelete, setShowDelete] = useState(false);

    const [showPhotos, setShowPhotos] = useState(false);

    return (
       <div className="actions">
       
        <Button data-tip="Modificar" onClick={() => setShow(true)}>
         <img src={Edit} alt="Edit"/>
        </Button>
        <FormModal show={show} setShow={setShow}>
         {setRefreshAlbums ? <ModificaAlbums album={entidad} setShow={setShow} setRefreshAlbums={setRefreshAlbums}/> : 
         <ModificaPosts setRefreshPosts={setRefreshPosts} post={entidad} setShow={setShow}/>}         
        </FormModal>

        <Button data-tip="Eliminar" onClick={() => setShowDelete(true)}>
        <img src={Delete} alt="Delete"/>
        </Button>
        <FormModal show={showDelete} setShow={setShowDelete}>
        {setRefreshAlbums ? <EliminaAlbums setShowDelete={setShowDelete} album={entidad} setRefreshAlbums={setRefreshAlbums}/>
        : <EliminaPosts setRefreshPosts={setRefreshPosts} setShow={setShowDelete} post={entidad}/>}
        </FormModal>
        <Button data-tip="Ver Fotos" onClick={() => setShowPhotos(true)}>
        <img src={Foto} alt="Fotos"/>
        </Button>
        <FormModal show={showPhotos} setShow={setShowPhotos}>
        {setRefreshAlbums ? <Photo setShow={setShowPhotos} entidad={entidad} setRefresh={setRefreshAlbums} coleccion="album"/>
        : <Photo setRefresh={setRefreshPosts} setShow={setShowPhotos} entidad={entidad} coleccion="post"/>}
        </FormModal>
        <ReactTooltip type="info" delayShow={1000} backgroundColor="#4E3B66"/>
       </div>
    )
       
}
