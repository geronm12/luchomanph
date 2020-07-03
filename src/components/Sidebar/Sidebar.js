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
    }

    return (
        <div className="sidebar">
           <ListGroup as="ul">
            <ListGroupItem><Image></Image></ListGroupItem>
            <ListGroupItem><Link to="/">Home</Link></ListGroupItem>
            <ListGroupItem as="li"><Link to="/albums">Albums</Link></ListGroupItem>
            <ListGroupItem as="li"><Link to="/posts">Posts</Link></ListGroupItem>
            <ListGroupItem as="li"><Link to="/perfil">Perfil</Link></ListGroupItem>
            <ListGroup.Item action onClick={Logout}>
             <Link to="">Salir</Link>
            </ListGroup.Item>
            </ListGroup>
        </div>
    )
}
