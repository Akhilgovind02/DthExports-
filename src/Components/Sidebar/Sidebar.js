import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "./dthLogo.png";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from "../Styles/HomeS/home.module.css";
import Incoming from "../Pages/Incoming/IncomingCheck";
import Header from "../header/header";
import IncomingCheck from "../Pages/Incoming/IncomingCheck";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();
  const [isMenuCollapsed, setMenuCollapsed] = useState(false);
  const [hide, Sethide] = useState(true);

  const toCheck = () => {
    Sethide(!hide)
    navigate('/incomingcheck')
  }

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <Container fluid className={styles.main}>
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
              {!isMenuCollapsed && <MenuItem> Dashboard </MenuItem>}
              <SubMenu label="Standard">
                {!isMenuCollapsed && (
                  <>
                    <SubMenu label="Incoming">
                      {!isMenuCollapsed && (
                        <>
                          <MenuItem onClick={toCheck}> Check </MenuItem>
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
      <div className={styles.mainr}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.std}>
          <div hidden ={hide}>
            <IncomingCheck />
          </div>
        </div>

        {/* <footer
          style={{ height: "61px" }}

          className="bg-dark navbar-dark"
        ></footer> */}
      </div>
    </Container>
  );
};

export default Sidebar;
