import { BackupTable, InstallMobileTwoTone } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  Row,
  Card,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
// import { XlviLoader } from "react-awesome-loaders"

import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function IncomingForm() {
  const [venue, setVenue] = useState("");
  const [VC, setVC] = useState("");
  const [TQC, setTQC] = useState("");
  const [team, setTeam] = useState([]);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.parentElement.children[0].value;
    if(e.target.parentElement.children[0].checked){
      setTeam((prevTeam) => [...prevTeam, newValue]);
    }
    else{
      setTeam((prevTeam) => prevTeam.filter((item) => item !== newValue));
    }
  };
  console.log(team);

  const batchCode = () => {
    axios
      .get("http://localhost:2500/incomingcheck", {
        headers: {
          "Content-Type": "application/text",
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data:");
      });
  };

  useEffect(() => {
    batchCode();
  }, []);

  var date = new Date();
  const updatedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}`;
  const check = () => {
    const batchcode = data.batchcode;
    axios
      .post("http://localhost:2500/recievecheck", {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          batchcode,
          venue,
          VC,
          TQC,
          team,
          status: 1,
          updatedAT: updatedDate,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data:");
      });
  };

  if (error) {
    return <div>Error occurred: {error}</div>;
  } else if (!data) {
    return (
      <Box sx={{ width: 100 }}>
        <Skeleton
          animation="wave"
          className="mx-5 my-3 mb-2"
          style={{ width: "200px", height: "150px" }}
        />
        <Skeleton
          animation="wave"
          className="mx-5 mb-2"
          style={{ width: "1500px", height: "60px" }}
        />
        <Skeleton
          animation="wave"
          className="mx-5 mb-2"
          style={{ width: "1500px", height: "60px" }}
        />
        <Skeleton
          animation="wave"
          className="mx-5 mb-0"
          style={{ width: "300px", height: "60px" }}
        />
        <Skeleton
          animation="wave"
          className="mx-5 mb-0"
          style={{ width: "300px", height: "250px" }}
        />
        <Skeleton
          animation="wave"
          className="mx-5 mt-0 "
          style={{ width: "80px", height: "60px" }}
        />
      </Box>
    );
  } else {
    return (
      <div>
        <h2 className="mx-5 my-4">Check</h2>
        <Form className="mx-5 my-5">
          <Row md="10" className="mb-3">
            <Form.Group as={Col} controlId="formGridBatchNo">
              <Form.Label>Batch Number</Form.Label>
              <Form.Control value={data.batchcode} type="batchno" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridVenue">
              <Form.Label>Venue</Form.Label>
              <Form.Select
                onChange={(e) => setVenue(e.target.value)}
                defaultValue="Select Venue.."
              >
                <option>Out Of Station</option>
                <option>In House</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTQC">
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
          </Button>
        </Form>
      </div>
    );
  }
}

export default IncomingForm;
