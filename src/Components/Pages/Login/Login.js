      import { Form,Button,Image } from "react-bootstrap";
      import { Container,Row,Col } from "react-bootstrap";
      import { useEffect } from "react";
      // import { useHistory } from "react-router-dom";
      import { useNavigate } from 'react-router-dom';
      import Logo from './dthLogo.png';  
      // import bg from './dth.png';
      import "./Login.css"
      import { useState } from "react";
      const  Login = ({onLogin}) => {
        const navigate = useNavigate();
        const[email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const [islogin,setislogin] =useState(false);

        useEffect(() => {
          if (islogin) {
            navigate('/home');
          }
        }, [islogin, navigate]);

        const handleLogin = () => {
          // console.log('this is handle login');
          // console.log(email, password);
          fetch('http://localhost:2500/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.status == 'ok') {
                onLogin(data);
                setislogin(true);
                navigate('/home');
              } else {
                // Handle invalid credentials here
                console.log('Invalid credentials');
              }
            })
            .catch((error) => {
              // Handle fetch error here
              console.error('Login failed:', error);
            });
        };


        
        return (
          <div>
            <Container fluid className="main">
              <Row className="row">
                <Col className="col1">
                
                    <Row  sm="12" md="10" lg="3" className="row1">
                    <Image className="logo" src={Logo}></Image>
                    </Row>
                  <Row className="row2">
                  <Form className="frm" >
                    <h2 className="head">Log in</h2>
                    <Form.Text style={{padding:'5px'}}>Email or phone</Form.Text>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" value={email} onChange={(e) =>setEmail( e.target.value)} style={{ borderColor:'gray', height: '50px', lineHeight: '50px' }} />
                    </Form.Group>
                    <Form.Text style={{padding:'5px'}}>Password</Form.Text>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" value={password} onChange={(e) =>setPassword( e.target.value)} style={{  borderColor:'gray', height: '50px', lineHeight: '50px' }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    </Form.Group>
                    <h5 className="fpm"><a className="fp" href="" ><Form.Text className="text-primary" >Forgot Password?</Form.Text></a></h5>
                        <Button onClick={handleLogin} style={{  height: 'fit', width:'425px', lineHeight: '50px' }} className="btn" variant="primary">
                          Submit
                        </Button>
                  </Form>
                  </Row>
                  
                </Col>
              </Row>
            </Container>
          </div>
        );
      }

      export default Login;
