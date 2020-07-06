import {PATH, TOKEN} from "../utils/consts";
import {getTokenApi} from "./login";


export function GetPosts(page){

    const url = `${PATH}/obtenerPosts?page=${page}`

    const parms = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, parms).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err =>  {
        return err;
    })


}




export function GetPostsById(id){

    const url = `${PATH}/obtenerPostsId?postid=${id}`

    const parms = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`
        }
    }

    return fetch(url, parms).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err =>  {
        return err;
    })


}


export function CreatePosts(files, data){

    const url = `${PATH}/crearPost`;
  
    const formData = new FormData();
  
    files.forEach(file => {
         formData.append("files", file) 
    });
  
  
    formData.append("titulo", data.titulo);
    formData.append("cuerpo", data.cuerpo);
    formData.append("folder", data.carpeta);
  
     
    const params = {
        method: 'POST',
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: formData
      };
  
  
      return fetch(url, params).then(response => {
          return response;
      }).catch(err => {
          return err;
      });
  }