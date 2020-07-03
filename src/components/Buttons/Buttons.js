import React from 'react';
import {ButtonToolbar, ButtonGroup, Button} from "react-bootstrap";

export default function Buttons() {
    return (
        <ButtonToolbar aria-label="Toolbar with button groups">
  <ButtonGroup className="mr-2" aria-label="First group">
    <Button>C</Button> 
  </ButtonGroup>
  <ButtonGroup className="mr-2" aria-label="Second group">
    <Button>M</Button>  
  </ButtonGroup>
  <ButtonGroup aria-label="Third group">
    <Button>E</Button>
  </ButtonGroup>
  <ButtonGroup aria-label="Third group">
    <Button>AF</Button>
  </ButtonGroup>
</ButtonToolbar>
    )
}
