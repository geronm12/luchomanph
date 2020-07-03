import React, { useState, useEffect, Children } from "react";
import {Container, Col} from "react-bootstrap";
import "./BasicLayout.scss";
import Sidebar from "../../Sidebar";



export default function BasicLayout(props){


    const {children, setRefreshLogin} = props;

    return(
        <Container>
            <Col xs={3}>
            <Sidebar  setRefreshLogin={setRefreshLogin}/>        
            </Col>
            <Col xs={9}>
            {children}
            </Col>
        </Container>
    )




}