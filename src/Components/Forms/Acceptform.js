import React, { useCallback, useRef, useState, useEffect, memo } from 'react'
import Webcam from 'react-webcam'
import {
    Form,
    Button,
    Col,
    Row,
  } from "react-bootstrap";
import axios from 'axios';
import { Exposure } from '@mui/icons-material';
function Acceptform() {

    const[BN,setBN] = useState('Select Box Number...');
    const [Texture,setTexture] = useState('Select Box Texture');
    const[EW,setEW] = useState('');
    const [size,setSize] = useState('Select Box Size...');
    const [color,setColor] = useState('Select Box Color');
    const [process,SetProcess]  = useState('');
    const [MQTY,setMQTY] = useState('')
    const [ExistBN,setExistBN]  = useState([])
    const [hid,setHid] = useState(true)
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



    const capture  = useCallback(() => {
        const imageSrc= webcamRef.current.getScreenshot()
        setImage(imageSrc);
    },[webcamRef])


   


    const getBatchCode = () => {
      axios
      .get("http://localhost:2500/bctoaccept", {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((response) => {
        console.log(response.data);
        setBatchcode(response.data[0].AcceptBC);
        if(response.data.length>1){
          setExistBN(response.data[1].BoxNumber)
        }
        else{
        console.log('No Box Number Available');
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setError("Error fetching data:");
      });
    }
    useEffect(() => {
      getBatchCode();
    }, []);


    


    var date = new Date();
    const updatedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}`;

    const addMore = () => {
      axios
      .post("http://localhost:2500/itemaccept", {
        headers: {
          "Content-Type": "application/text",
        },
        body:{
          'Bactcode':batchCode,
          'BoxNumber': BN,
          'MaterialQuantity': material_qty,
          'Image': image,
          'Box_size':size,
          'Box_colour':color,
          'Box_texture':Texture,
          'process':process,
          UpdatedAt:updatedDate,
        }
      })
      .then((response) => {
        console.log(response.data);
        // setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setError("Error fetching data:");
      });
    }

    const Mainsubmit = () => {
      axios
      .post("http://localhost:2500/toacceptperm", {
        headers: {
          "Content-Type": "application/text",
        },
        body:{
          'Bactcode':batchCode,
          'BoxNumber': BN,
          'MaterialQuantity': material_qty,
          'Image': image,
          'Box_size':size,
          'Box_colour':color,
          'Box_texture':Texture,
          'process':process,
          UpdatedAt:updatedDate,
        }
      })
      .then((response) => {
        console.log(response.data);
        // setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setError("Error fetching data:");
      });
    }
  return (

    <div>
        <Form className="mx-5 my-5">
          <Row md="10" className="mb-3">
            <Form.Group as={Col} controlId="formGridBatchNo">
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

            <Form.Group as={Col} controlId="formGridVenue">
              <Form.Label>Box Size</Form.Label>
              <Form.Select
                onChange={(e) => setSize(e.target.value)}
                defaultValue="Select Vendor Code..."
              >
                <option>S1</option>
                <option>S2</option>
                <option>S3</option>
                <option>S4</option>
                <option>S5</option>
                <option>S6</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
          <Form.Group as={Col} controlId="formGridVenue">
              <Form.Label>Box Colour</Form.Label>
              <Form.Select
                onChange={(e) => setColor(e.target.value)}
                defaultValue="Select Vendor Code..."
              >
                <option>C1</option>
                <option>C2</option>
                <option>C3</option>
                <option>C4</option>
                <option>C5</option>
                <option>C6</option>
              </Form.Select>
            </Form.Group>
            <Form.Group style={{width:'180px'}} as={Col} controlId="formGridVenue">
              <Form.Label>Box Texture</Form.Label>
              <Form.Select
                onChange={(e) => setTexture(e.target.value)}
                defaultValue="Select Vendor Code..."
              >
                <option>T1</option>
                <option>T2</option>
                <option>T3</option>
                <option>T4</option>
                <option>T5</option>
                <option>T6</option>
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
          </Row>
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
        <Button onClick={addMore} as={Col} className='mt-2 mx-1'>
          Add More
        </Button>
        <Button onClick={Mainsubmit} as={Col} className='mt-2 mx-1'>
          Submit  
        </Button>
      </Row>
        

    </div>

  )
}

export default Acceptform