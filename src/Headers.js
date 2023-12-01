import React from 'react'
import {Nav, Button} from "react-bootstrap"


const Headers = () => {
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
  </Nav>
  )
}

export default Headers