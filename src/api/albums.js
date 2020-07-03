import {PATH, TOKEN} from "../utils/consts";



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