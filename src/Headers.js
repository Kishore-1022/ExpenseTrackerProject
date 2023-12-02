import React from 'react'
import {Nav, Button} from "react-bootstrap"
import api from './Contextapi';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const Headers = () => {
  const ctx = useContext(api);
  const navigate=useNavigate()
  const logoutHandler=()=>{
    ctx.logout()
    navigate('/')

  }
  return (
    <Nav defaultActiveKey="/home" as="ul" className='bg-dark d-flex justify-content-between'>
      <div  className=' d-flex'>
      <Nav.Item as="li">
        <Nav.Link  className='text-light' href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link  className='text-light' href='/product' eventKey="link-1">Product</Nav.Link>
      </Nav.Item>
      </div>
      <Button size='sm m-1' onClick={logoutHandler}>Logout</Button>
  </Nav>
  
  )
}

export default Headers