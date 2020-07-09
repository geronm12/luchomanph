import React, {useState, useCallback} from 'react';
import {Carousel, Button, Spinner,FormGroup} from "react-bootstrap";
import {map} from "lodash";

import {DeletePhotoFromAlbum,DeletePhotoFromPost,AddPhoto} from "../../api/photo";
import {useDropzone} from 'react-dropzone'
import {toast} from "react-toastify";
import Delete from "../../assets/svg/close-white-36dp.svg";
import FormModal from "../Modals/FormModal";

import Check from "../../assets/svg/check-white-36dp.svg";
import Close from "../../assets/svg/close-white-36dp.svg";
import Add from "../../assets/png/baseline_attach_file_white_18dp.png";

import "./Photo.scss";

export default function Photo(props) {
    
    const {entidad, setRefresh, setShow,coleccion} = props;
     
    const {fotos} = entidad;

    const [loading, setLoading] = useState(false);

    const [questionModal, setQuestionModal] = useState(false);

    const [indice, setIndice] = useState(0);

    const [file, setFile] = useState(null);

    const DeletePicture = (index) => {
           setLoading(true);  
          if(coleccion === "album"){
            DeletePhotoFromAlbum(entidad._id, index).then(res => {
            setLoading(false);
            toast.success("Foto eliminada con éxito");
            setRefresh(true);
            setShow(false);
            return true;
         
          }).catch(() => {
            setLoading(false);
            toast.error("No se pudo eliminar la foto.");
            setRefresh(true);
            setShow(false);
            return false;
           
          }).finally(() => {
            setLoading(false);
            setRefresh(true);
            setShow(false);
              
          })
        }else{
          DeletePhotoFromPost(entidad._id, index).then(res => {
            setLoading(false);
            toast.success("Foto eliminada con éxito");
            setRefresh(true);
            setShow(false);
          }).catch(() => {
            setLoading(false);
            toast.error("No se pudo eliminar la foto.");
            setRefresh(true);
            setShow(false);
          }).finally(() => {
            setLoading(false);
            setRefresh(true);
            setShow(false);
          })

        }


    }


    const AddPicture = () => {
        if(file != null){
          setLoading(true);
          AddPhoto(entidad._id, coleccion, file).then(response => {
            setLoading(false);
            toast.success("Foto agregada con éxito");
            setRefresh(true);
            setShow(false);
          }).catch(() => {
            toast.error("Ocurrió un error al guardar la foto");
            setRefresh(true);
            setShow(false);
          }).finally(() => {
            setLoading(false);
            setRefresh(true);
            setShow(false);
          });
        }else{
          toast.warning("El archivo es obligatorio");
        }
          
    }


    const showQuestion = (index) =>  {
        setIndice(index);
        setQuestionModal(true);
    }  

    
      const onDrop = useCallback(acceptedFile => {
          const file = acceptedFile[0];
          setFile(file); 
      });
        



    
      const {getRootProps, getInputProps} = useDropzone({ 
      accept: "image/jpeg, image/png",
      noKeyboard:true,
      multiple:true,
      onDrop: onDrop});



    return (
        <div className="photo">
          <div className="photo__top">
         <div {...getRootProps()} className="photo__top__files">
           <h6>Insertar Archivo</h6>
          <input {...getInputProps()}/>
         </div>
         <Button onClick={AddPicture}>{!loading ? <img src={Add} alt="add" style={{width: "60%"}}/> : <Spinner animation="grow" variant="light"/> }</Button> 
         </div>
         <Carousel indicators={false} className="photo__carrousel">
            {map(fotos,(foto, index) => ( 
            <Carousel.Item key={index} className="photo__carrousel__item">
            <img
              className="d-block w-100"
              src={foto.fotoUrl}
              alt= ""
            />
            <Carousel.Caption className="photo__carrousel__caption">
              <Button onClick={() => showQuestion(index)}><img src={Delete} alt="delete"/></Button>
              <QuestionModall show={questionModal} setShow={setQuestionModal} deletePicture={DeletePicture} index={indice} setLoading={setLoading} loading={loading}/>
            </Carousel.Caption>
            </Carousel.Item>
            ))}
          </Carousel>
          </div>
    )
}


 function  QuestionModall (props) {
    const {show, setShow, index, deletePicture, setLoading, loading} = props;
  
  const onDeleteQuestion = async () => {
        setLoading(true);
        await deletePicture(index);
        setShow(false);
  }
        
  
  return <FormModal show={show} setShow={setShow}>
          <div className="question-modal">
          <h2>¿Desea borrar la foto?</h2>
          <div className="question-modal__div"></div>
           {loading ? <Spinner animation="border" variant="light"/> :
          <FormGroup className="question-modal__buttons">
            <Button onClick={onDeleteQuestion}>
               <img src={Check} alt="Check"/>
            </Button>
            <Button onClick={() => setShow(false)}>
            <img src={Close} alt="Close"/>
            </Button>
          </FormGroup>
}     </div>
        </FormModal>
}