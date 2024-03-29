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
    const [Bdisabled,setBdisabled] = useState(true);
    const [MQTY,setMQTY] = useState('')
    const [ExistBN,setExistBN]  = useState([])
    const [DWeight,SetDweight] = useState();
    const [hid,setHid] = useState(true)
    const [team,setTeam] = useState([]);
    const [process,SetProcess] = useState('')
    const material_qty = EW-2.700
    const [batchCode,setBatchcode] = useState('')
    const [baHide,setBahide] = useState(true);

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

      console.log(material_qty)
      let BalanceW = DWeight
      let wasteage = BalanceW
      if(EW.length>0){
        BalanceW -= material_qty
        wasteage = BalanceW
      }
      console.log('wasteage before',wasteage)

   
    // let wasteage = BalanceW



    let WastagePercentage = (wasteage/DWeight)*100
    WastagePercentage = Math.round(WastagePercentage*100)/100



    let LastBalance = 0;
    const disable = () => {
      setBdisabled(false);
      setBahide(false);
      if(BalanceW){
        if(BalanceW!=0){
          LastBalance= BalanceW-wasteage;

          console.log('balance',LastBalance);
        }
        else{
          console.log("no Wastage")
        }
      }
      else{
        alert("No Ether")
      }
    }




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
          SetDweight(response.data[4].EndMQnty)
     
          
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

      const DayendPost = () => {
        axios
        .post("http://localhost:2500/DayendTempPost", {
          headers: {
            "Content-Type": "application/text",
          },
          body:{
            'Batch_Code' : batchCode,
            'Box_No' : BN,
            'Process_' : process,
            'material_qty':material_qty,
            'UpdatedAt':updatedDate,
          }
        })
        .then((response) => {
          alert('Data Submitted Successfully')
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // setError("Error fetching data:");
        });
        window.location.reload();
      }
    












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
          <Form.Group  className='mt-4' as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "400px" }}>
                Enter Weight Shown in the Screen
              </Form.Label>
              <Form.Control
                onChange={(e) => setEW(e.target.value)}
                type="enter weight"
                placeholder='Enter Weight'
              />
            </Form.Group>
            <Form.Group  className='mt-4' as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "200px" }}>
                Material Quantity 
              </Form.Label>
              <Form.Control
              onChange={(e)=>setMQTY(material_qty)}
              value={
                  EW ?(
                    isNaN(material_qty ) ?(
                      "please Enter a Valid Number"
                    ):
                    material_qty>0 ?(
                      material_qty + "kg"
                    ):(
                      "Please enter a posible number"
                    )
                  ):(
                    "Please Enter Weight"
                  )
              }
                type="process"
              />
            </Form.Group>
            <Form.Group hidden={baHide} className='mt-4' as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "200px" }}>
                Balance
              </Form.Label>
              <Form.Control
                onChange={''}
                value={BalanceW == 0 ?(
                  BalanceW
                ):(
                  LastBalance
                )}
                type="balance"
                placeholder='Enter Balance'
              />
            </Form.Group>
            <Form.Group hidden={baHide} className='mt-4' as={Col} controlId="formGridTQC">
              <Form.Label style={{ width: "200px" }}>
                Total Percentage Waste 
              </Form.Label>
              <Form.Control
                value={WastagePercentage == 0?(
                  WastagePercentage+"%"
                ):(
                  WastagePercentage+"%"
                )}
                type="balance"
                placeholder='Total Percentage waste '
              />
            </Form.Group>
            </Row>
            <Row hidden={baHide}  className='mt-2'>
            <h2  className='mb-3'>Team</h2>
            <Table dataSource={data} pagination={false} />
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
      <Button className='mt-2 mx-1' onClick={disable}>Process Finished</Button>
      <Button  as={Col} onClick={capture} hidden={hid} className='mt-2 mx-1'>
          Capture
        </Button>
        <Button hidden={Bdisabled} id='btn1' onClick={click} as={Col} className='mt-2 mx-1'>
          Click
        </Button>
      </Row>

      <Row className='mx-5 my-2'>
       
        <Button onClick={DayendPost} as={Col} className='mt-2 mx-1'>
          Submit  
        </Button>
      </Row>
    </div>

  )
}

export default Dayend;