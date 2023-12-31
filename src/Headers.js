import React from 'react'
import {Nav, Button} from "react-bootstrap"
import { authActions } from './Contextapi';
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';


const Headers = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const logoutHandler=()=>{
    dispatch(authActions.logout())
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