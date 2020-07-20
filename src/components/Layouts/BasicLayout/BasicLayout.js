import React, { useState, useEffect, Children } from "react";
import {Container, Col, Row} from "react-bootstrap";
import Sidebar from "../../Sidebar";

import "./BasicLayout.scss";


export default function BasicLayout(props){


    const {children, setRefreshLogin, active} = props;

    return(
       
        <Container fluid>
            <Row >
            <Col xs={12} className="content">
            <Sidebar  setRefreshLogin={setRefreshLogin} active={active} className="nav"/>        
            </Col>
            </Row>
            <Row>
            <Col xs={12} className="content">
            {children}
            </Col>
            </Row>
          
        </Container>
     
    )




}