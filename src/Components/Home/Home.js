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
import { NavLink } from 'react-router-dom';

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import styles from './home.module.css'
import BusinessIcon from '@mui/icons-material/Business';
import RecyclingIcon from '@mui/icons-material/Recycling';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';
function Home() {
  return (
    <Container fluid className={styles.main}>
    
    <div style={{ display: 'flex', height: '87vh', overflow: 'scroll initial'}}>
      <div>
        <CDBSidebar textColor="black" backgroundColor="rgba(240, 240, 240, 0.5)" >
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Image style={{width: '90px'}} src={logo}></Image>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">Dashborad</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/tables" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Standard</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Recycle</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="arrow-right">Log out</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
      </div>
      <div className={styles.mainr}>
      <div className={styles.cntn}></div>
    <footer style={{height:"61px"}} className='bg-dark navbar-dark'></footer>
    </div>
    </Container>
  
  );
};

export default Home;