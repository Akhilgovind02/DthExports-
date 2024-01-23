import React, { useCallback, useRef, useState, useEffect, memo } from 'react'
import Webcam from 'react-webcam'
import {
    Form,
    Button,
    Col,
    Row,
    Dropdown,
    Card,
    ListGroup,
  } from "react-bootstrap";
import axios from 'axios';
import { useTransition } from 'react';
function Daystart() {

    const[BN,setBN] = useState('Select Box Number...');
    const[EW,setEW] = useState('');
    const [MQTY,setMQTY] = useState('')
    const [ExistBN,setExistBN]  = useState([])
    const [hid,setHid] = useState(true)
    const [team,setTeam] = useState([])
    const [process,SetProcess] = useState('')

    const[base64image,setBase64image] = useState(null);

    const material_qty = EW-2.700
    const [batchCode,setBatchcode] = useState('')

    const option = [];

    for (let i = 1; i <= 99; i++) {
      if (!ExistBN.includes(i)) {
        option.push(<option key={i} value={i}>{i}</option>);
      }
    }

    const webcamRef = useRef(null)
    const[image,setImage] = useState(null)
    const[status,setStatus] = useState(null)

    var button = document.getElementById('btn1')
    const click = () => {
      setStatus(1);
      setHid(false);
    }


    const handleInputChange = (e) => {
        const newValue = e.target.parentElement.children[0].value;
        if(e.target.parentElement.children[0].checked){
          setTeam((prevTeam) => [...prevTeam, newValue]);
        }
        else{
          setTeam((prevTeam) => prevTeam.filter((item) => item !== newValue));
        }
      };

    const capture  = useCallback(() => {
        const imageSrc= webcamRef.current.getScreenshot()
        setImage(imageSrc);
    },[webcamRef])


    const getBatchCode = () => {
        axios
        .get("http://localhost:2500/daystart", {
          headers: {
            "Content-Type": "application/text",
          },
        })
        .then((response) => {
          console.log(response);
          
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // setError("Error fetching data:");
        });
      }
      useEffect(() => {
        getBatchCode();
      }, []);


  return (

    <div>
        <Form  style={{width:'700px'}} className="mx-5 my-5">
          <Row md="10" className="mb-0">
            <Form.Group  as={Col} controlId="formGridBatchNo">
              <Form.Label>Batch Number</Form.Label>
              <Form.Control type="batchno" value={
                batchCode?(
                  batchCode
                ):(
                  'All batch code have been submitted'
                )
                }/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridVenue">
              <Form.Label>Box Number</Form.Label>
              <Form.Select
                onChange={(e) => setBN(e.target.value) }
                defaultValue={BN}
              >
                {option}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "200px" }}>
                Process
              </Form.Label>
              <Form.Control
                onChange={(e) => SetProcess(e.target.value)}
                type="process"
                defaultValue='Raw Material'
              />
            </Form.Group>
          </Row>
          <Row>
          <Row style={{marginTop:'-20px'}} className="mb-2 ">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select Workers
              </Dropdown.Toggle>
              <Dropdown.Menu onChange={handleInputChange}>
                <Form.Check
                  type="checkbox"
                  label="Worker 1"
                  value={"worker 1"}
                />
                <Form.Check
                  type="checkbox"
                  label="Worker 2"
                  value={"worker 2"}
                />
                <Form.Check
                  type="checkbox"
                  label="Worker 3"
                  value={"worker 3"}
                />
                <Form.Check
                  type="checkbox"
                  label="Worker 4"
                  value={"worker 4"}
                />
                <Form.Check
                  type="checkbox"
                  label="Worker 5"
                  value={"worker 5"}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          </Row>

          <h5 className="my-4">Selected Workers</h5>
          <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
              {team.map((member, index) => (
                <ListGroup.Item key={index}>{member}</ListGroup.Item>
              ))}{" "}
            </ListGroup>
          </Card>

          <Form.Group className='mt-4' as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "400px" }}>
                Enter Weight Shown in the Screen
              </Form.Label>
              <Form.Control
                onChange={(e) => setEW(e.target.value)}
                type="enter weight"
                placeholder='Enter Weight'
              />
            </Form.Group>
            <Form.Group className='mt-4' as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "400px" }}>
                Material Quantity 
              </Form.Label>
              <Form.Control
              onChange={(e)=>setMQTY(material_qty)}
              value={
                  EW ?(
                    isNaN(material_qty) ?(
                      "please Enter a Valid Number"
                    ):
                    material_qty+"kg"
                  ):(
                    "Please Enter Weight"
                  )
              }
                type="process"
              />
            </Form.Group>
        </Form>
        {
            status==1 ?(
            image ? (
                <img src={image} alt='webcam' />
            ):(
                <Webcam className='mx-5 mt-0 mb-0' height={600} width={600} ref={webcamRef} />
            )
            ):(
                <></>
            )
        }
      <Row className='mx-5 my-2'>
      <Button as={Col} onClick={capture} hidden={hid} className='mt-2 mx-1'>
          Capture
        </Button>
        <Button id='btn1' onClick={click} as={Col} className='mt-2 mx-1'>
          Click
        </Button>
      </Row>

      <Row className='mx-5 my-2'>
       
        <Button onClick={''} as={Col} className='mt-2 mx-1'>
          Submit  
        </Button>
      </Row>
    </div>

  )
}

export default Daystart;