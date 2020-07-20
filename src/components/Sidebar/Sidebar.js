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
import HomeActive from "../../assets/png/home_orange.png";
import AlbumActive from "../../assets/png/collections_orange.png";
import BlogActive from "../../assets/png/description_orange.png";

 


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
           
            <Link to="/" className= {"sidebar__item " + (active === 1 ? "pressed" : "")}>
                { active === 1 ?  <Image src={HomeActive} className="active"/> :  <Image src={Home}/>}
                
            </Link>        
            <Link to="/albums" className={"sidebar__item " + (active === 3 ? "pressed" : "")} >
               {active === 3 ?  <Image src={AlbumActive} className="active"/> :  <Image src={Album}/>}
               
            </Link>
            <Link to="/posts" className={"sidebar__item " + (active === 2 ? "pressed" : "")}>
               {active === 2 ?  (<Image src={BlogActive} className="active"/>)  :  (<Image src={Blog}/>) }
             
            </Link>  
             <ListGroup.Item action  className="sidebar__item" >
             <Image src={Poff} onClick={Logout}/>
           
            </ListGroup.Item>
            </ListGroup>
        </div>
    )
}
