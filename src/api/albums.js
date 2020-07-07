import {PATH, TOKEN} from "../utils/consts";
import {getTokenApi} from "./login";


export function GetAlbums(page){

    const url = `${PATH}/obtenerAlbums?page=${page}`

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



export function GetAlbumsById(id){

    const url = `${PATH}/obtenerAlbumsId?albumid=${id}`

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



export function CreateAlbums(files, title){

  const url = `${PATH}/crearAlbum`;

  const formData = new FormData();

  files.forEach(file => {
       formData.append("files", file) 
  });


  formData.append("titulo", title);
 

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


export function UpdateAlbums(id, title){

    const url = `${PATH}/modificarAlbum?albumid=${id}`;

    const params = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(title)
    }


    return fetch(url, params).then(response => {
         return response;
    }).catch(err => {
        return err;
    });

}   


export function DeleteAlbum(id){

    const url = `${PATH}/eliminarAlbum?albumid=${id}`;

    const params ={
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(response => response).catch(err => err);

}