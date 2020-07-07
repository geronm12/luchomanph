import React, {useState, useCallback} from 'react';
import {Form, FormGroup, FormControl, Button} from "react-bootstrap";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {CreatePosts, DeletePost, UpdatePost} from "../../../api/posts";
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
    <Form>
        <FormGroup>
            <FormControl type="text" placeholder="titulo" defaultValue={post.titulo} onChange={setChange} name="titulo"/>
        </FormGroup>
        <FormGroup>
            <FormControl type="text" as="textarea" placeholder="Cuerpo" defaultValue={post.cuerpo} onChange={setChange} name="cuerpo"/>
        </FormGroup>
        <FormGroup>
            <Button onClick={updatePost}>Guardar</Button>
            <Button onClick={() => setShow(false)}>Cancelar</Button>
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
        <Form>
            <FormGroup>
                <h2>¿Estás seguro que deseas eliminar el post?</h2>
            </FormGroup>
            <FormGroup>
                <Button onClick={eliminarPost}>Ok</Button>
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