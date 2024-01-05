import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "../../../../styles/Home/home.module.css";
import IncomingForm from '../../../Forms/IncomingForm'
import { Link } from "react-router-dom";
import {Outlet} from 'react-router-dom'
export default function Dashboard(props) {
 
  return (
    <div className={styles.std} style={{ backgroundColor: "lightgrey" }}>
      <Outlet></Outlet>
    </div>
  );
}
