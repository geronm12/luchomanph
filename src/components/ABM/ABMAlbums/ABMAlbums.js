import React, {useState, useCallback} from 'react';
import {Button, Form, FormGroup, FormControl, Spinner} from "react-bootstrap";
import {CreateAlbums,UpdateAlbums, DeleteAlbum} from "../../../api/albums";
import Check from "../../../assets/svg/check-white-36dp.svg";
import Close from "../../../assets/svg/close-white-36dp.svg";
import Camara from "../../../assets/png/outline_add_a_photo_white_36dp.png";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import "./ABMAlbums.scss";

export function AltaAlbums(props) {

    const {setShow, setRefreshAlbums} = props;

    const [files, setFiles] = useState(null);

    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");

    const onDropFiles = useCallback(acceptedfiles => {
      const files = acceptedfiles;
      setFiles(files);
    })

    const {
      getRootProps: getRootFilesProps,
      getInputProps: getInputFilesProps
    } = useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard:true,
      multiple:true,
      onDrop: onDropFiles
    });



    const closeModal = () => {
      setShow(false);
    }

    const onCreate = async ()=> {
       
        setLoading(true);

        if(title && title !== ""){
        
        if(files){
          
          await CreateAlbums(files, title).then(response =>{
              setLoading(false);
              toast.success("Album creado con éxito");
              setRefreshAlbums(true);
              setShow(false);
            

          }).catch(err => {
            setLoading(false);
            setRefreshAlbums(true);
            setShow(false);
          }).finally(() => {
            setLoading(false);
            setRefreshAlbums(true);
            setShow(false);
          }
            )
        }
      }

   }

 
   return (
      <Form className="alta-albums">
        <h3>Crear Nuevo Album</h3>
         <div {...getRootFilesProps()} className="alta-albums__fotos">
            <img src={Camara} alt="Camara"/>
            <input {...getInputFilesProps()} />
          </div>
        <FormGroup className="alta-albums__titulo">
           <FormControl type="text" name="titulo" placeholder="Título del album" value= {title} onChange={(e) => setTitle(e.target.value)}/>           
        </FormGroup>
        {loading ? (<Spinner animation="border" variant="light" className="alta-albums__spinner"/>) :
        <FormGroup className="alta-albums__buttons">
           <Button onClick={onCreate}><img src={Check} alt="Check"/></Button>
           <Button onClick={closeModal}><img src={Close} alt="Close"/></Button>
       </FormGroup>}
      </Form>
    )
}

export function ModificaAlbums(props) {

    const {album, setShow, setRefreshAlbums} = props;

    const [titulo, setTitulo] = useState(album.titulo);

    const [loading, setLoading] = useState(false);

    const modificarAlbum = () => {
        setLoading(true);
        UpdateAlbums(album._id, titulo).then(response => {
           if(response.ok){
            setLoading(false);
            toast.success("Modificado con éxito");
            setRefreshAlbums(true);
            setShow(false);
           }
         
      }).catch(err => {
        setLoading(false)
        toast.error("Ocurrió un error al actualizar el album");
      }).finally(() => {
        setLoading(false);
      });

    }


    return (
      <Form className="edit-album">
        <h2>Editar</h2>
        <div className="edit-album__divider"></div>
          <FormGroup className="edit-album__input">
            <FormControl type="text" name="titulo" defaultValue={titulo} onChange={e => setTitulo({[e.target.name]:e.target.value})}/>           
        </FormGroup>
        <FormGroup>

        </FormGroup>
        {loading ? (<Spinner animation="border" variant="light" className="edit-album__spinner"/>) :
        <FormGroup className="edit-album__buttons">
           <Button onClick={modificarAlbum}><img src={Check} alt="Check"/></Button>
           <Button onClick={()=> setShow(false)}><img src={Close} alt="Close"/></Button>
       </FormGroup>}
      </Form>
    )
}

export function EliminaAlbums(props) {

   const {setShowDelete, album, setRefreshAlbums} = props;

   const [loading, setLoading] = useState(false);

    const deleteAlbum = () => {
      if(album._id){
        setLoading(true);   
        DeleteAlbum(album._id).then(response => {
           toast.success("Albúm eliminado con éxito");
           setRefreshAlbums(true);
           setLoading(false);
         }).catch(err => {
           toast.error("Ocurrió un error al eliminar el albúm.");
           setRefreshAlbums(true);
           setLoading(false);
         }).finally(() => {
           setLoading(false);
         })
       }
    }

    return (
      <Form className="eliminar-album">
        <FormGroup className="eliminar-album__titulo">
        <h2>¿ Desea eliminar el Albúm ?</h2>
        </FormGroup>
        <div className="eliminar-album__divider"></div>

        {loading ? (<Spinner animation="border" variant="light" className="eliminar-album__spinner"/>) :
        <FormGroup className="eliminar-album__buttons">
           <Button onClick={deleteAlbum}><img src={Check} alt="Check"/></Button>
           <Button onClick={() => setShowDelete(false)}><img src={Close} alt="Close"/></Button>
       </FormGroup>}
      </Form>
    )
}
