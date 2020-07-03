import {PATH, TOKEN} from "../utils/consts";



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