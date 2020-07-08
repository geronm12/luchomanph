import {PATH, TOKEN} from "../utils/consts";
import {getTokenApi} from "./login";

export function AddPhoto(id, coleccion, file){
    
    const url = `${PATH}/agregarFoto?id=${id}&coleccion=${coleccion}`;

    const formData = new FormData();

    formData.append("foto", file);

    const params = {
        method: "PUT",
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

export function DeletePhotoFromAlbum(id, photoId){
 
    const url = `${PATH}/eliminarFotoAlbum?albumid=${id}&photoid=${photoId}`;

    const params = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(response => response).catch(err => err);
} 

export function DeletePhotoFromPost(id, photoId){
 
    const url = `${PATH}/eliminarFotoPost?postid=${id}&photoid=${photoId}`;

    
    const params = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
 
    return fetch(url, params).then(response => response).catch(err => err);
} 