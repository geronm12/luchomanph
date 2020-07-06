import React, {useState, useCallback} from 'react';
import {Form, FormGroup, FormControl, Button} from "react-bootstrap";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {CreatePosts} from "../../../api/posts";
import "./ABMPosts.scss";


export  function AltaPosts(props) {

    const {setShow, setRefreshPosts} = props;

    const [files, setFiles] = useState(null);
    
    const [form, setForm] = useState(initialValues());

    const [loading, setLoading] = useState(false);
    
    function setFormData(e){
        setForm({...form, [e.target.name]:e.target.value});
    }

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


    function onCreate(){
        console.log(files);
        console.log(form);
        CreatePosts(files, form).then(response => {
            setLoading(false);
            toast.success("Post creado con éxito");
            setRefreshPosts(true);
            setShow(false);

        }).catch(err => {
            setLoading(false);
            toast.error("Ocurrió un error al guardar el post");
            setRefreshPosts(true);
            setShow(false);
            window.location.reload();
        }).finally(() => {
            setLoading(false);
            setRefreshPosts(true);
            setShow(false);
        });
    }

    return (
        <Form className="abm-posts">
            <div {...getRootFilesProps()} className="abm-posts__post-files">
            <input {...getInputFilesProps()} />
            </div>
            <FormGroup>
                <FormControl type="text" placeholder="Titulo" name="titulo"  defaultValue={form.titulo} onChange={setFormData}/>
            </FormGroup>
            <FormGroup>
                <FormControl type="text" placeholder="Nombre de la carpeta de fotos" name="carpeta"  defaultValue={form.carpeta} onChange={setFormData}/>
            </FormGroup>
            <FormGroup>
                <Button>B</Button>
                <Button>S</Button>
            </FormGroup>
            <FormGroup>
                <FormControl type="text" as="textarea" placeholder= "Cuerpo"  defaultValue={form.cuerpo} name="cuerpo" onChange={setFormData}/>
            </FormGroup>
            <FormGroup>
                <Button onClick={onCreate}>Guardar</Button>
                <Button onClick={() => setShow(false)}>Cancelar</Button>
            </FormGroup>
        </Form>
    )
}


function initialValues(){
    return {
        titulo: "",
        cuerpo: "",
        carpeta: ""
    }
}