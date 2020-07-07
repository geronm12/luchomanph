import React, {useState, useCallback} from 'react';
import {Button, Form, FormGroup, FormControl} from "react-bootstrap";
import {CreateAlbums,UpdateAlbums, DeleteAlbum} from "../../../api/albums";
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
         <div {...getRootFilesProps()}className="alta-albums__fotos">
            <input {...getInputFilesProps()} />
          </div>
        <FormGroup className="alta-albums__titulo">
            <FormControl type="text" name="titulo" placeholder="Título del album" value= {title} onChange={(e) => setTitle(e.target.value)}/>           
        </FormGroup>
        <FormGroup className="alta-albums__buttons">
           <Button onClick={onCreate}>Guardar</Button>
           <Button onClick={closeModal}>Cancelar</Button>
       </FormGroup>
      </Form>
    )
}

export function ModificaAlbums(props) {

    const {album, setShow, setRefreshAlbums} = props;

    const [titulo, setTitulo] = useState(album.titulo);

    const modificarAlbum = () => {
        UpdateAlbums(album._id, titulo).then(response => {
           if(response.ok){
            toast.success("Modificado con éxito");
            setRefreshAlbums(true);
            setShow(false);
           }
         
      }).catch(err => {
        console.log(err);
        toast.error("Ocurrió un error al actualizar el album");
      });

    }


    return (
      <Form>
          <FormGroup>
            <FormControl type="text" name="titulo" defaultValue={titulo} onChange={e => setTitulo({[e.target.name]:e.target.value})}/>           
        </FormGroup>
        <FormGroup>

        </FormGroup>
        <FormGroup>
           <Button onClick={modificarAlbum}>Guardar</Button>
           <Button onClick={()=> setShow(false)}>Cancelar</Button>
       </FormGroup>
      </Form>
    )
}

export function EliminaAlbums(props) {

   const {setShowDelete, album, setRefreshAlbums} = props;

   const [loading, setLoading] = useState(false);

    const deleteAlbum = () => {
       if(album._id){
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
      <Form>
        <FormGroup>
        <h2>¿Está seguro que desea eliminar el albúm?</h2>
        </FormGroup>
        <FormGroup>
           <Button onClick={deleteAlbum}>Ok</Button>
           <Button onClick={() => setShowDelete(false)}>Cancelar</Button>
       </FormGroup>
      </Form>
    )
}
