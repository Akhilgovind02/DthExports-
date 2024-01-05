import { useState } from "react";
import React from "react";

import { Container, Image } from "react-bootstrap";
import logo from "../../../../Assets/dthLogo.png";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from '../../../../styles/Sidebar/sidebar.module.css'
import { useNavigate,Link } from "react-router-dom";
import IncomingForm from '../../../Forms/IncomingForm'

function Sidebar() {
  const navigate = useNavigate();
  const [isMenuCollapsed, setMenuCollapsed] = useState(false);
  // const[check,setCheck] = useState('');
  const toCheck = () => { 
    // navigate('/home')
    // <Link to='/incomingcheck'></Link>
    // props.value = 'check'
    // setCheck("hello")
    // return check;
  };

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <Container fluid >
      <div
        style={{ display: "flex", height: "87vh", overflow: "scroll initial" }}
      >
        <div>
          <button
            style={{
              paddingLeft: "20px",
              marginTop: "20px",
              marginBottom: "5px",
              border: 0,
              width: "40px",
              height: "40px",
            }}
            onClick={toggleMenu}
          >
            <Image style={{ width: "40px", height: "40px" }} src={logo}></Image>
          </button>
          <div className={isMenuCollapsed ? styles.collapsed : styles.expanded}>
            <Menu>
              {!isMenuCollapsed && 
              <Link style={{textDecoration:'none', color:'black'}} to='/dashboard'>
              <MenuItem> Dashboard </MenuItem>
              </Link>
              }
              <SubMenu label="Standard">
                {!isMenuCollapsed && (
                  <>
                    <SubMenu label="Incoming">
                      {!isMenuCollapsed && (
                        <>
                          <Link style={{textDecoration:'none', color:'black'}} to='/dashboard/incomingForm'>
                            <MenuItem > Check </MenuItem>
                          </Link>
                          <MenuItem> Accept </MenuItem>
                        </>
                      )}
                    </SubMenu>{" "}
                    <SubMenu label="Production">
                      {!isMenuCollapsed && (
                        <>
                          <MenuItem> Day Start </MenuItem>
                          <MenuItem> Day End </MenuItem>
                        </>
                      )}
                    </SubMenu>{" "}
                    <MenuItem> Despatch </MenuItem>
                    <MenuItem> Outgoing </MenuItem>
                  </>
                )}
              </SubMenu>
              {!isMenuCollapsed && <MenuItem> Report </MenuItem>}
              <SubMenu label="Recycle">
                {!isMenuCollapsed && (
                  <>
                    <MenuItem> RCL - ADD </MenuItem>
                    <MenuItem> RCL - Day Start </MenuItem>
                    <MenuItem> RCL - Day End </MenuItem>
                  </>
                )}
              </SubMenu>{" "}
            </Menu>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Sidebar;
