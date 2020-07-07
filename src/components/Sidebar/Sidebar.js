import React, {useState, useEffect} from 'react';
import "./Sidebar.scss";
import {ListGroup, Image} from "react-bootstrap"
import {Link} from "react-router-dom";
import {logoutApi} from "../../api/login";
import classNames from 'classnames/bind';

import Blog from "../../assets/svg/description-white-36dp.svg";
import Album from "../../assets/svg/collections-white-36dp.svg";
import Home from "../../assets/svg/home-white-36dp.svg";
import Poff from "../../assets/svg/power_settings_new-white-36dp.svg";


export default function Sidebar(props) {

    const {setRefreshLogin, active} = props;
     
    const Logout = () => {
        logoutApi();
        setRefreshLogin(true);
        return (<Link to=""></Link>)
    }

   
    return (
        <div className="sidebar">
           <ListGroup as="ul">
            <Image></Image>                 
            <Link to="/" className= {"sidebar__item " + (active === 1 ? "pressed" : "")}>
                <Image src={Home}/>
                <span>Home</span>
            </Link>        
            <Link to="/albums" className={"sidebar__item " + (active === 3 ? "pressed" : "")} >
                <Image src={Album}/>
                <span>Albums</span>
            </Link>
            <Link to="/posts" className={"sidebar__item " + (active === 2 ? "pressed" : "")}>
                <Image src={Blog}/> 
                <span>Posts</span>
            </Link>  
             <ListGroup.Item action  className="sidebar__item" >
             <Image src={Poff}/>
             <span onClick={Logout}>Salir</span>
            </ListGroup.Item>
            </ListGroup>
        </div>
    )
}
