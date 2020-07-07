import React, {useState, useCallback} from 'react';
import {Form, FormGroup, FormControl, Button} from "react-bootstrap";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {CreatePosts, DeletePost, UpdatePost} from "../../../api/posts";

import Check from "../../../assets/svg/check-white-36dp.svg";
import Close from "../../../assets/svg/close-white-36dp.svg";
import Camara from "../../../assets/png/outline_add_a_photo_white_36dp.png";
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
        <Form className="crear-post">
            <div {...getRootFilesProps()} className="crear-post__files">
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

export function ModificaPosts(props){

    const {post, setRefreshPosts, setShow} = props;

    const [data, setData] = useState(post);

    const [loading, setLoading] = useState(false);

    const updatePost = () => {
        UpdatePost(post._id,data).then(response =>{
            toast.success("Post modificado con éxito");
            setLoading(false);
            setRefreshPosts(true);
            setShow(false);
        }).catch(() => {

            toast.error("Ocurrió un error actualizando el post");
            setLoading(false);
            setRefreshPosts(true);
            setShow(false);

        });
    }

    const setChange = (e) => {
        setData({...data, [e.target.name] : e.target.value});
    }

    return (
    <Form className="modificar-post">
        <h2>Editar</h2> 
        <FormGroup className="modificar-post__titulo">
            <FormControl type="text" placeholder="titulo" defaultValue={post.titulo} onChange={setChange} name="titulo"/>
        </FormGroup>
        <FormGroup className="modificar-post__cuerpo">
            <FormControl type="text" as="textarea" placeholder="Cuerpo" defaultValue={post.cuerpo} onChange={setChange} name="cuerpo"/>
        </FormGroup>
        <FormGroup className="modificar-post__buttons">
            <Button onClick={updatePost}><img src={Check}/></Button>
            <Button onClick={() => setShow(false)}><img src={Close}/></Button>
        </FormGroup>
    </Form>);


}

export function EliminaPosts(props){
    const {post, setRefreshPosts, setShow} = props;

    const [loading, setLoading] = useState(false);

    const eliminarPost = () => {
        DeletePost(post._id).then(response => {
            toast.success("Post eliminado con éxito");
            setRefreshPosts(true);
            setLoading(false);
            setShow(false);
        }).catch(() => {
           toast.error("Ocurrió un error al eliminar el post.");
           setRefreshPosts(true);
           setLoading(false);
           setShow(false);
        }).finally(() => {
            setLoading(false);
        });
            
    }


    return(
        <Form className="eliminar-post">
            <h2>¿ Desea eliminar el Post ?</h2>
            <div className="eliminar-post__divider"></div>
            <FormGroup className="eliminar-post__buttons">
                <Button onClick={eliminarPost}><img src={Check}/></Button>
                <Button onClick={() => setShow(false)}><img src={Close}/></Button>
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