import React, { useEffect, useRef, useState } from 'react';
import { Nav, Form, Button, ListGroup } from 'react-bootstrap';

const Welcome = () => {
    const moneySpent = useRef();
    const description = useRef();
    const expenseCategory = useRef();
    const [exp,setExp]=useState([])
    const url='https://expensetracker-ded49-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json'
    const expenseCategories = ["Food", "Petrol", "Salary", "Rent", "Other"];
  

    const fetchHandler=async()=>{
      try{
        const res=await fetch(url)
        const data=await res.json()
     
      let obj=[]
      for (let i in data){
        const key=i;
        obj.push({...data[i],key})
      }
      setExp(obj)
      }catch(err){
        console.log(err.message)
      }
      console.log(exp)
      
    }

    useEffect(()=>{
      fetchHandler()
    },[])

    const submitHandler=async(e)=>{
      e.preventDefault();
      const expenseData = {
        moneySpent: moneySpent.current.value,
        description: description.current.value,
        expenseCategory: expenseCategory.current.value
      };
      try {
        const res=await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
       });
     }catch(err){
       console.log(err.message)
    }
    e.target.reset()

    }

    return (
        <div className="welcome-container ">
            <div className='d-flex justify-content-between top'>
                <div>Welcome to Expense Tracker!!</div>
                <div className='d-flex'>
                    <div>Your Profile is incomplete!</div>
                    <Nav.Link className="text-primary" href='/profile'>Complete now</Nav.Link>
                </div>
            </div>

            <Form className="welcome-form d-flex" onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Money Spent:</Form.Label>
                    <Form.Control type="number" placeholder="Enter amount" ref={moneySpent} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Expense Description:</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter description" ref={description} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Expense Category:</Form.Label>
                    <Form.Control as="select" ref={expenseCategory}>
                        {expenseCategories.map((category, index) => (
                            <option key={index}>{category}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button type="submit" >Add</Button>
            </Form>
            <ListGroup as="ol"  >
              {exp.map(i=>(
                <ListGroup.Item  className="d-flex justify-content-between" as="li" key={i.key}>
                  <p className="me-3">{i.expenseCategory}</p>
                  <p className="me-3">{i.description}</p>
                  <p>{i.moneySpent}</p>
                </ListGroup.Item> 
              ))}
      
     
            </ListGroup>

        </div>
    );
};

export default Welcome;
