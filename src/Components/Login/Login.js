import { Form,Button,Image } from "react-bootstrap";
import { Link } from "react-router-dom"
import { Container,Row,Col } from "react-bootstrap";
import Logo from './dthLogo.png';  
// import bg from './dth.png';
import "./Login.css"
function Login() {
  return (
    <div>
      <Container fluid className="main">
        <Row className="row">
          <Col className="col1">
           
              <Row  sm="12" md="10" lg="3" className="row1">
              <Image className="logo" src={Logo}></Image>
              </Row>
            <Row className="row2">
            <Form className="frm">
              <h2 className="head">Log in</h2>
              <Form.Text style={{padding:'5px'}}>Email or phone</Form.Text>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email"   style={{ borderColor:'gray', height: '50px', lineHeight: '50px' }} />
              </Form.Group>
              <Form.Text style={{padding:'5px'}}>Password</Form.Text>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" style={{  borderColor:'gray', height: '50px', lineHeight: '50px' }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
              </Form.Group>
              <h5 className="fpm"><a className="fp" href="" ><Form.Text className="text-primary" >Forgot Password?</Form.Text></a></h5>
              <Link to ='/home'>
                <Button style={{  height: 'fit', width:'425px', lineHeight: '50px' }} className="btn" variant="primary" type="submit">
                  Submit
                </Button>
              </Link>
            </Form>
            </Row>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
