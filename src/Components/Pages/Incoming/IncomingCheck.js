import React from 'react'
import { Container, Row,Col } from "react-bootstrap";
import IncomingForm from '../../Utils/IncomingForm';
import Sidebar from '../../Sidebar/Sidebar';


function IncomingCheck() {
  return (
    <Container>
        
            <Sidebar />
            <IncomingForm />
          
    </Container>
  )
}

export default IncomingCheck;