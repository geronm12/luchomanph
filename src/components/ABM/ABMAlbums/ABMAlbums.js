import React, {useState, useCallback} from 'react';
import {Button, Form, FormGroup, FormControl} from "react-bootstrap";
import {CreateAlbums} from "../../../api/albums";
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
              window.location.reload();

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
    return (
      <Form>
          <FormGroup>
            <FormControl type="text" name="titulo"/>           
        </FormGroup>
        <FormGroup>

        </FormGroup>
        <FormGroup>
           <Button>Guardar</Button>
           <Button>Cancelar</Button>
       </FormGroup>
      </Form>
    )
}

export function EliminaAlbums(props) {
    return (
      <Form>
          <FormGroup>
            <FormControl type="text" name="titulo"/>           
        </FormGroup>
        <FormGroup>

        </FormGroup>
        <FormGroup>
           <Button>Guardar</Button>
           <Button>Cancelar</Button>
       </FormGroup>
      </Form>
    )
}
