import { BackupTable, InstallMobileTwoTone } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
import {Form,Button,Col,Row,Card,ListGroup} from 'react-bootstrap'
// import { XlviLoader } from "react-awesome-loaders"

import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

function IncomingForm() {

  const[venue,setVenue] = useState('');
  const[VC,setVC] = useState('');
  const[TQC,setTQC] = useState('');
  const[team,setTeam] = useState('');
  const[data,setData] = useState('');
  const[error,setError] = useState('');
  console.log(venue,VC,TQC,team);


const batchCode = () => {
    axios.get('http://localhost:2500/incomingcheck', {
    headers: {
      'Content-Type': 'application/json',
    },

  })
  .then(response => {
    console.log(response.data);
    setData(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    setError("Error fetching data:")
  });
}

useEffect(() => {
  batchCode();
}, []);

const check = () => {
  const batchcode = data.batchcode;
  axios.post('http://localhost:2500/recievecheck', {
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ batchcode,venue, VC, TQC, team }),
})
.then(response => {
  console.log(response.data);
  setData(response.data);
})
.catch(error => {
  console.error('Error fetching data:', error);
  setError("Error fetching data:")
});
}




if(error) {
  return  <div>Error occurred: {error }</div>;
}
else if(!data){
  return (
  //   <Stack spacing={1.5}>
  //   <Skeleton variant="text" className='mx-5 mb-3 ' style={{width:'200px', height:'150px'}} />
  //   <Skeleton variant="text" className='mx-5 ' style={{width:'250px', height:'80px'}} sx={{ fontSize: '6rem' }} />
  //   <Skeleton variant="text" sx={{ fontSize: '6rem' }} />
  //   <Skeleton variant="text" sx={{ fontSize: '6rem' }} />

  //   <Skeleton variant="rectangular" width={210} height={60} />
  // </Stack>  

  <Box sx={{ width: 100, }}>
      <Skeleton animation="wave"  className='mx-5 my-3 mb-2' style={{width:'200px' ,height:'150px'}} />
      <Skeleton animation="wave"  className='mx-5 mb-2' style={{width:'1500px', height:'60px'}} />
      <Skeleton animation="wave"  className='mx-5 mb-2' style={{width:'1500px', height:'60px'}} />
      <Skeleton animation="wave"  className='mx-5 mb-0' style={{width:'300px', height:'60px'}} />
      <Skeleton animation="wave"  className='mx-5 mb-0' style={{width:'300px', height:'250px'}} />
      <Skeleton animation="wave"  className='mx-5 mt-0 ' style={{width:'80px', height:'60px'}} />
    </Box>
  )
  } else{
  return (
    <div>
      <h2 className='mx-5 my-4'>Check</h2>
      <Form className='mx-5 my-5'>
      <Row md='10' className="mb-3">
        <Form.Group as={Col} controlId="formGridBatchNo">
          <Form.Label>Batch Number</Form.Label>
          <Form.Control 
          value={data.batchcode}
          type="batchno" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridVenue">
          <Form.Label>Venue</Form.Label>
          <Form.Select onChange={(e) => setVenue(e.target.value)} defaultValue="Select Venue..">
            <option>Out Of Station</option>
            <option>In House</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridVC">
          <Form.Label>Vendor Code</Form.Label>
          <Form.Select onChange={(e) =>setVC(e.target.value) } defaultValue="Select Vendor Code">
            <option>VC1</option>
            <option>VC2</option>
            <option>VC3</option>
            <option>VC4</option>
            <option>VC5</option>
            <option>VC7</option>
            <option>VC8</option>
            <option>VC9</option>
            <option>VC10</option>
          </Form.Select>
        </Form.Group>

        
        <Form.Group as={Col} controlId="formGridTQC">
          <Form.Label style={{width:'200px'}}>Total Quantity Checked</Form.Label>
          <Form.Control onChange={(e) =>setTQC(e.target.value) } type="Venue" placeholder="Enter Quantity" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridTeam">
          <Form.Label>Team</Form.Label>
          <Form.Select onChange={(e) => setTeam(e.target.value)} defaultValue="Select Workers..">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>
        </Row>
      
      <h5 className='my-4'>Selected Workers</h5>
        <Card style={{ width: '18rem' }}>
      <Card.Header>Featured</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>


      <Button onClick={check} variant="primary" type='button'>
        Submit
      </Button>
    </Form>
    </div>
  
  )}
};

export default IncomingForm 