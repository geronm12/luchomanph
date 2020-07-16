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