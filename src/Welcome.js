import React, { useEffect, useRef, useState } from 'react';
import { Nav, Form, Button, ListGroup } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from './Contextapi';

const Welcome = () => {
    const moneySpent = useRef();
    const description = useRef();
    const expenseCategory = useRef();
    const [exp,setExp]=useState([])
    const theme=useSelector(state=>state.auth.theme)
    const dispatch=useDispatch()

    const convertExpensesToCSV = (expenses) => {
      const header = "Expense Category,Description,Money Spent\n";
      const csvData = expenses.map(
        (expense,index) =>
          `${index+1} ${expense.expenseCategory} ${expense.description} ${expense.moneySpent}`
      );
      return header + csvData.join("\n");
    };
    

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
    }
    const removeHandler=async(id)=>{
      const res = await fetch(`https://expensetracker-ded49-default-rtdb.asia-southeast1.firebasedatabase.app/expense/${id}.json`,{
        method:'DELETE'
      })
      alert('Expense Successfuly deleted')
    }

    const editHandler=async(e,id)=>{
      e.preventDefault() 
      try{
        const res = await fetch(`https://expensetracker-ded49-default-rtdb.asia-southeast1.firebasedatabase.app/expense/${id}.json`)

        const data = await res.json();
        moneySpent.current.value = data.moneySpent;
        description.current.value = data.description;
        expenseCategory.current.value = data.expenseCategory;
        removeHandler(id)
       
      }catch(err){
        console.log(err.message)
      }    
     
    }
    useEffect(()=>{
      fetchHandler()
    },[removeHandler])

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
    e.target.reset();
    }

    const toggleDarkTheme = () => {
      dispatch(authActions.toggle())
    };
    const downloadCSV = () => {
      const csvContent = convertExpensesToCSV(exp);
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expenses.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };
    
    return (
        <div className={`welcome-container ${theme ? 'dark-theme' : 'light-theme'}`}>
            <div className='d-flex justify-content-between top'>
                <div>Welcome to Expense Tracker!!</div>
                <div className='d-flex'>
                    <div>Your Profile is incomplete!</div>
                    <Nav.Link className="text-primary" href='/profile'>Complete now</Nav.Link>
                </div>
            </div>
            <Button onClick={toggleDarkTheme} variant="primary" className="mb-3">Toggle Dark Theme</Button>

            <Button onClick={downloadCSV} variant="info" className="mb-3">Download Expenses CSV</Button>

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
                  {i.moneySpent> 10000? <><p>{i.moneySpent}</p><p><Button size='sm gold' >premium</Button></p></>:<p>{i.moneySpent}</p>}
                  <p><Button size='sm btn-success' onClick={(e)=>editHandler(e,i.key)}>Edit</Button></p>
                  <p><Button size='sm btn-danger' onClick={(e)=>removeHandler(i.key)}>Delete</Button></p>  
                </ListGroup.Item> 
              ))}
            </ListGroup>

        </div>
    );
};

export default Welcome;
