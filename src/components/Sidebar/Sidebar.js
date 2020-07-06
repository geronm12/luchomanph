import React from 'react';
import "./Sidebar.scss";
import {ListGroup, ListGroupItem, Image} from "react-bootstrap"
import {Link} from "react-router-dom";
import {logoutApi} from "../../api/login";
export default function Sidebar(props) {

    const {setRefreshLogin} = props;
   
    const Logout = () => {
        logoutApi();
        setRefreshLogin(true);
        
        return (<Link to=""></Link>)
    }

    return (
        <div className="sidebar">
           <ListGroup as="ul">
            <Image></Image>                 
            <Link to="/">Home</Link>        
            <Link to="/albums">Albums</Link>
            <Link to="/posts">Posts</Link>  
             <ListGroup.Item action onClick={Logout}>
             Salir
            </ListGroup.Item>
            </ListGroup>
        </div>
    )
}
