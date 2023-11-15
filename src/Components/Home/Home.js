import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
import logo from './dthLogo.png'
import { Link } from 'react-router-dom';
// import './Home.css'
import styles from './home.module.css'
import BusinessIcon from '@mui/icons-material/Business';
import RecyclingIcon from '@mui/icons-material/Recycling';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';
function Home() {
  return (
    <div>
    <Navbar expand="lg" id={styles.nav} className="bg-body-tertiary">
      <Container fluid>
        <Link to="/home"><Navbar.Brand ><Image style={{width: '90px'}} src={logo}></Image></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className={styles.main}>

      <Button style={{backgroundColor:'rgb(120, 59, 234)'}} className={styles.btnm}><BusinessIcon style={{width:'40px', height:'40px', margin:'10px'}}></BusinessIcon>Standard</Button>
      <Button style={{backgroundColor:'rgb(29, 157, 80)'}} className={styles.btnm}><RecyclingIcon style={{width:'40px' ,height:'40px', margin:'10px'}}></RecyclingIcon>Recycle</Button>
      <Button style={{backgroundColor:'rgb(140, 65, 164)'}} className={styles.btnm}><SummarizeIcon style={{width:'40px', height:'40px' ,margin:'10px'}}></SummarizeIcon>Report</Button>
      <Button style={{backgroundColor:'rgb(250, 112, 62)'}} className={styles.btnm}><LogoutIcon style={{width:'40px' ,height:'40px', margin:'10px'}}></LogoutIcon>Logout</Button>
    </div>
    </div>
  );
};

export default Home;