import React from 'react'
import { Nav } from 'react-bootstrap'

const Welcome = () => {
  return (
    <>
    <div className='d-flex  justify-content-between top'>
        <div>Welcome to Expense Tracker!!</div>
        <div className='d-flex'>
            <div>Your Profile is incomplete !</div>
            <Nav.Link className="text-primary" href='/profile'> Complete now</Nav.Link>
        </div> 
    </div> 
    
     
    </>
   
  )
}

export default Welcome