import {React,useEffect,useState} from 'react'
import styles from '../../styles/Home/home.module.css'
import {Container} from 'react-bootstrap'
import Sidebar from './Elements/Sidebar/Sidebar'
import Header from './Elements/Header/Header'
import IncomingForm from '../Forms/IncomingForm'
import Dashboard from './Elements/Content/Dashboard'
import { Outlet } from "react-router-dom";

function Home() {
  
  return (
    <div>
        <Container fluid className={styles.main}>
        <Sidebar />
        <div className={styles.mainr}>
        <Header />
        <Dashboard />
        </div>
        </Container>   
    </div>
  )
}

export default Home;