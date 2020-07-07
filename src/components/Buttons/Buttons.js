import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import "./Buttons.scss";
import ReactTooltip  from "react-tooltip";
import FormModal from '../Modals/FormModal';
import { ModificaAlbums, EliminaAlbums} from '../ABM/ABMAlbums/ABMAlbums';
import {ModificaPosts, EliminaPosts} from "../ABM/ABMPosts/ABMPosts";


export default function Buttons(props) {


    const {entidad, setRefreshAlbums, setRefreshPosts} = props;

    const [show, setShow] = useState(false);
    
    const [showDelete, setShowDelete] = useState(false);

    return (
       <div className="actions">
       
        <Button data-tip="Modificar" onClick={() => setShow(true)}>
         M
        </Button>
        <FormModal show={show} setShow={setShow}>
         {setRefreshAlbums ? <ModificaAlbums album={entidad} setShow={setShow} setRefreshAlbums={setRefreshAlbums}/> : 
         <ModificaPosts setRefreshPosts={setRefreshPosts} post={entidad} setShow={setShow}/>}         
        </FormModal>

        <Button data-tip="Eliminar" onClick={() => setShowDelete(true)}>
        E
        </Button>
        <FormModal show={showDelete} setShow={setShowDelete}>
        {setRefreshAlbums ? <EliminaAlbums setShowDelete={setShowDelete} album={entidad} setRefreshAlbums={setRefreshAlbums}/>
        : <EliminaPosts setRefreshPosts={setRefreshPosts} setShow={setShowDelete} post={entidad}/>}
        </FormModal>
        <Button data-tip="Agregar foto">
        F
        </Button>
        <ReactTooltip type="info" delayShow={1000} backgroundColor="#4E3B66"/>
       </div>
    )
       
}
