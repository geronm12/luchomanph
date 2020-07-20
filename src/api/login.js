import {PATH, TOKEN} from "../utils/consts";
import JwtDecode from "jwt-decode";

export function Sigin(user){

    const url = `${PATH}/login`;

    const data = {
        ...user
    }

    const params = {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300){
            return response.json()
        }

        return {
            mensaje: "Usuario o Contraseña incorrectos"
        }
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });

}


export function setTokenApi(token){
    localStorage.setItem(TOKEN, token)
}


export function getTokenApi(){
    return localStorage.getItem(TOKEN);
}

export function logoutApi(){
    localStorage.removeItem(TOKEN);
}

export function isUserLogedApi(){
    const token = getTokenApi()

    if (!token){
        return null
    }


    if(isExpired(token))
    {
        logoutApi();
    }

    return JwtDecode(token);
}

export function Register(usuario){
    const url = `${PATH}/registro`;

    const params = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    };

    return fetch(url, params).then(response => {
        return response.json()
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    });

}

 function isExpired(token) {
    const {exp} = JwtDecode(token);
    const expire = exp * 1000;
    const timeout = expire - Date.now();

    if (timeout < 0){
        return true;
    }else{
        return false;
    }
}