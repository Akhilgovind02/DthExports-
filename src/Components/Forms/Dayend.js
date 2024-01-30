import React, { useCallback, useRef, useState, useEffect, memo } from 'react'
import { Table } from 'antd';

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

function Dayend() {

    const[BN,setBN] = useState('Select Box Number...');
    const[EW,setEW] = useState('');
    const [MQTY,setMQTY] = useState('')
    const [ExistBN,setExistBN]  = useState([])
    const [DWeight,SetDweight] = useState();
    const [hid,setHid] = useState(true)
    const [team,setTeam] = useState([]);
    const [process,SetProcess] = useState('')
    const material_qty = EW-2.700
    const [batchCode,setBatchcode] = useState('')

    const option = [];

    for (let i = 0; i <= ExistBN.length-1; i++) {
        option.push(<option key={ExistBN[i]} value={ExistBN[i]}>{ExistBN[i]}</option>);
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



      // const get_BN_data = () => {
      // for(let i=0;i<boxNdata.length;i++){ 
      //   if(boxNdata[i].boxRef == BN){
      //   setBoxNoCurrentData([boxNdata[i]])
      //  }
      // }}
      // console.log(BoxNoCurrentData)





      const getBatchCode = () => {
        axios
        .get("http://localhost:2500/dayend", {
          headers: {
            "Content-Type": "application/text",
          },
        })
        .then((response) => {
          console.log(response.data);
          setBatchcode(response.data[0].BatchNo);
          setBN(response.data[1].BoxNo)
          SetProcess(response.data[2].endProcess)
          SetDweight(response.data[2].EndMQnty)
     
          
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // setError("Error fetching data:");
        });
      }
      useEffect(() => {
        getBatchCode();
      }, []);










const columns = [{
  title: 'Workers',
  dataIndex: 'Workers',
  key: 'Workers',
}, {
  title: 'Quantity Used',
  dataIndex: 'Quantity Used',
  key: 'Quantity Used',
}, {
  title: 'Output',
  dataIndex: 'Output',
  key: 'Output',
}, {
  title: 'Waste Percantage',
  key: 'Waste Percentage',
}];

const data = [{
  
}];



















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
              <Form.Control
              value={BN?(
                BN
              ):(
                "Please complete a Day start of any box "
              )}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "200px" }}>
                Process
              </Form.Label>
              <Form.Control
                onChange={''}
                type="process"
                value={process}
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
              <Form.Label style={{ width: "200px" }}>
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
            <Form.Group className='mt-4' as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "200px" }}>
                Balance
              </Form.Label>
              <Form.Control
                onChange={(e) => setEW(e.target.value)}
                type="balance"
                placeholder='Enter Balance'
              />
            </Form.Group>
            <Form.Group className='mt-4' as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "200px" }}>
                Total Percentage Waste 
              </Form.Label>
              <Form.Control
                onChange={(e) => setEW(e.target.value)}
                type="balance"
                placeholder='Total Percentage waste '
              />
            </Form.Group>
            </Row>
            <Row  className='mt-2'>
            <h2 className='mb-3'>Team</h2>
            <Table columns={columns} dataSource={data} pagination={false} />
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
       
        <Button onClick={''} as={Col} className='mt-2 mx-1'>
          Submit  
        </Button>
      </Row>
    </div>

  )
}

export default Dayend;