import React, { useContext, useRef } from 'react'
import { Nav , Button, Form} from 'react-bootstrap'
import api from './Contextapi'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const name =useRef();
    const url=useRef();
    const ctx = useContext(api);
    const navi=useNavigate();
   
   
    
    const sumbitHandler= async(e)=>{
        e.preventDefault();
        const api="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDW06_RxkmqCUsLd7-gYF9mGl0bDsIaHLs"
        try{
            const res= await fetch(api,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  idToken: ctx.token, // Get the user's ID token
                  displayName: name.current.value, // Updated display name
                  photoUrl: url.current.value, // Updated photo URL
                  returnSecureToken: true,
                }),
              });  
             const data=await res.json()
             console.log(data)    
        }catch(err){
            console.log(err)
        }
        navi("/welcome")
        e.target.reset();
        }
  return (
    <>
    <div className='d-flex  justify-content-between top'>
        <div>Winners never quit, Quitters never win.</div>
        <div className='color'>
            <div>Your Profile is 64% complete. A complete Profile has higher chances of landing a job.
            <Nav.Link className="text-primary" href='/profile'> Complete now</Nav.Link>
            </div>      
        </div> 
    </div> 
    <Form onSubmit={sumbitHandler}>
        <div className='d-flex gap-2 mt-4'> 
            <Form.Group className="mb-3">
                <Form.Label> Full Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" ref={name}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Profile Photo URL: </Form.Label>
                <Form.Control type="text" placeholder="Enter URL" ref={url}/>
            </Form.Group>
        </div>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
    </>
  )
  }


export default Profile