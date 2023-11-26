
import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from "./home.module.css";
import logo from './dthLogo.png'

const Home = ({user}) => {
  console.log(user);
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);
  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };


  return (
    <Container fluid className={styles.main}>
      <h1>{user}</h1>
      <div style={{ display: "flex", height: "87vh", overflow: "scroll initial" }}>
        <div>
          <button style={{border:0}} onClick={toggleMenu}><Image style={{width:'60px', height:'50px'}} src={logo}></Image></button>
          <div style={{ width: isMenuCollapsed ? '40px' : '200px', transition: 'width 0.3s' }}>
            <Menu>
              <SubMenu label="Charts">
                {!isMenuCollapsed && (
                  <>
                    <MenuItem> Pie charts </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                  </>
                )}
              </SubMenu>
              {!isMenuCollapsed && <MenuItem> Documentation </MenuItem>}
              {!isMenuCollapsed && <MenuItem> Calendar </MenuItem>}
            </Menu>
          </div>
        </div>
      </div>
      <div className={styles.mainr}>
        <div className={styles.cntn}></div>
        <footer style={{ height: "61px" }} className="bg-dark navbar-dark"></footer>
      </div>
    </Container>
  );
};

export default Home;


