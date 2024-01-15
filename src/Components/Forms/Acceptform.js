import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import {
    Form,
    Button,
    Col,
    Row,
    Card,
    ListGroup,
    Dropdown,
  } from "react-bootstrap";
function Acceptform() {

    const[BN,setBN] = useState('Select Box Number...')
    const option = [];
    for(let i=1;i<=99;i++){
        option.push(<option key={i} value={i}>{i}</option>);
    }

    const webcamRef = useRef(null)
    const[image,setImage] = useState(null)
    const[status,setStatus] = useState(null)

    const capture  =useCallback(() => {
        const imageSrc= webcamRef.current.getScreenshot()
        setImage(imageSrc);
    },[webcamRef])

    
  return (

    <div>
        <Form className="mx-5 my-5">
          <Row md="10" className="mb-3">
            <Form.Group as={Col} controlId="formGridBatchNo">
              <Form.Label>Batch Number</Form.Label>
              <Form.Control type="batchno" />
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

            {/* <Form.Group as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "200px" }}>
                Total Quantity Checked
              </Form.Label>
              <Form.Control
                onChange={(e) => setTQC(e.target.value)}
                type="Venue"
                placeholder="Enter Quantity"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridVenue">
              <Form.Label>Vendor Code</Form.Label>
              <Form.Select
                onChange={(e) => setVC(e.target.value)}
                defaultValue="Select Vendor Code..."
              >
                <option>VC 1</option>
                <option>VC 2</option>
                <option>VC 3</option>
                <option>VC 4</option>
                <option>VC 5</option>
                <option>VC 6</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
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

          <h5 className="my-4">Selected Workers</h5>
          <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
              {team.map((member, index) => (
                <ListGroup.Item key={index}>{member}</ListGroup.Item>
              ))}{" "}
            </ListGroup>
          </Card>

          <Button onClick={check} variant="primary" type="button">
            Submit
          </Button> */}
          </Row>
        </Form>
        {
            status==1 ?(
            image ? (
                <img src={image} alt='webcam' />
            ):(
                <Webcam height={600} width={600} ref={webcamRef} />
            )
            ):(
                <></>
            )
        }
        <Button onClick={capture}>Capture</Button>
        <Button onClick={()=>{setStatus(1)}}>Click</Button>
    </div>

  )
}

export default Acceptform