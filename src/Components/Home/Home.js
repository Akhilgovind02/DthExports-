// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { Image } from "react-bootstrap";
// import logo from "./dthLogo.png";
// import { Link } from "react-router-dom";
// // import './Home.css'
// import { NavLink } from "react-router-dom";
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarFooter,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from "cdbreact";
// import styles from "./home.module.css";
// import { useState } from "react";

// const Home = () => {

//   const [Menu, setMenu] = useState(false);
//   const toggle = () => {
//     setMenu(!Menu);
//   }
//   return (
//     <Container fluid className={styles.main}>
//       <div
//         style={{ display: "flex", height: "87vh", overflow: "scroll initial" }}
//       >
//         <div>
//           {/* <CDBSidebar textColor="black" backgroundColor="rgba(240, 240, 240, 0.5)">
//             <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//               <Image style={{ width: '90px' }} src={logo}></Image>
//             </CDBSidebarHeader>
//             <CDBSidebarContent className="sidebar-content">
//               <CDBSidebarMenu>
//                 <NavLink exact to="/" activeClassName="activeClicked">
//                   <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
//                 </NavLink>
//                 <NavLink exact to="/tables" activeClassName="activeClicked">
//                   <CDBSidebarMenuItem icon="table">Standard</CDBSidebarMenuItem>
//                 </NavLink>
//                 <NavLink exact to="/profile" activeClassName="activeClicked">
//                   <CDBSidebarMenuItem icon="user">Recycle</CDBSidebarMenuItem>
//                 </NavLink>
//                 <ul>
//                 <CDBSidebarMenuItem icon="chart-line">
//                   Reports
//                 </CDBSidebarMenuItem>
//                 {Menu && (
//                 <li onClick={toggle} hidden="true">
//                 <NavLink exact to="/analytics/report1" activeClassName="activeClicked">
//                   <CDBSidebarMenuItem subItem icon="angle-right">
//                     Report 1
//                   </CDBSidebarMenuItem>
//                 </NavLink>
//                 <NavLink exact to="/analytics/report2" activeClassName="activeClicked">
//                   <CDBSidebarMenuItem subItem icon="angle-right">
//                     Report 2
//                   </CDBSidebarMenuItem>
//                 </NavLink>
//                 </li>
//                 )}
//                 </ul>
              
                
//                 <NavLink exact to="/logout" activeClassName="activeClicked">
//                   <CDBSidebarMenuItem icon="arrow-right">Log out</CDBSidebarMenuItem>
//                 </NavLink>
//                 <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
//                   <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
//                 </NavLink>
//               </CDBSidebarMenu>
//             </CDBSidebarContent>
//             <CDBSidebarFooter style={{ textAlign: 'center' }}>
//               <div
//                 style={{
//                   padding: '20px 5px',
//                 }}
//               >
//                 Your footer content here
//               </div>
//             </CDBSidebarFooter>
//           </CDBSidebar> */}
//           <button onClick={toggle}>Toggle Collapse</button>
//       <div style={{ width: Menu ? '50px' : '200px', transition: 'width 0.3s' }}>
//       const MyMenu = ({ Menu }) => (
//   <Menu>
//     <SubMenu label="Charts">
//       {!Menu && (
//         <>
//           <MenuItem> Pie charts </MenuItem>
//           <MenuItem> Line charts </MenuItem>
//         </>
//       )}
//     </SubMenu>
//     {!Menu && <MenuItem> Documentation </MenuItem>}
//     {!Menu && <MenuItem> Calendar </MenuItem>}
//   </Menu>
// );
//         </div>
          
//         </div>
//       </div>
//       <div className={styles.mainr}>
//         <div className={styles.cntn}></div>
//         <footer
//           style={{ height: "61px" }}
//           className="bg-dark navbar-dark"
//         ></footer>
//       </div>
//     </Container>
//   );
// }


// export default Home;


import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from "./home.module.css";

const Home = () => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(false);

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <Container fluid className={styles.main}>
      <div style={{ display: "flex", height: "87vh", overflow: "scroll initial" }}>
        <div>
          <p>Hellooo</p>
          <button onClick={toggleMenu}>Toggle Collapse</button>
          <div style={{ width: isMenuCollapsed ? '50px' : '200px', transition: 'width 0.3s' }}>
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
