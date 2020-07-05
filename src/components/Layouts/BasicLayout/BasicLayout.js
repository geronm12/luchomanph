import React, { useState, useEffect, Children } from "react";
import {Container, Col, Row} from "react-bootstrap";
import "./BasicLayout.scss";
import Sidebar from "../../Sidebar";



export default function BasicLayout(props){


    const {children, setRefreshLogin} = props;

    return(
       
        <Container fluid>
            <Row >
            <Col xs={2}>
            <Sidebar  setRefreshLogin={setRefreshLogin}/>        
            </Col>
            <Col xs={9}>
            {children}
            </Col>
            <Col xs={1}>
            </Col>
          </Row>
        </Container>
     
    )




}