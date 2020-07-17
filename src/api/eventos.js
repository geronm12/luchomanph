import {PATH} from "../utils/consts";
import {getTokenApi} from "./login";



export function GetEventos(month){

    const url = `${PATH}/obtenerEventos?month=${month}`;


    const params = {
         headers: {
             Authorization: `Bearer${getTokenApi()}`
         }
    }


    return fetch(url, params).then(response => response.json()).then(result => result).catch(err => err);


}

export function CreateEvento(evento){

    const url = `${PATH}/crearEvento`;

    const params = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getTokenApi()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(evento)
    }

    return fetch(url, params).then(response => response).catch(err => err);

}

export function DeleteEvento(id){
    
    const url = `${PATH}/eliminarEvento?id=${id}`;
    const params = {
        headers:{
        method: 'DELETE',
        Authorization: `Bearer ${getTokenApi()}`
         }
    };


    return fetch(url, params).then(response => response).catch(err => err);
}

export function UpdateEvento(id,evento){

    const url = `${PATH}/modificarEvento?id=${id}`;
    const params = {
        headers:{
        method: 'PUT',
        Authorization: `Bearer ${getTokenApi()}`
         },
        body: JSON.stringify(evento)
    };

    return fetch(url, params).then(response => response).catch(err => err);
}