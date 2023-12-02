import React, { useRef } from 'react';
import { Nav, Form } from 'react-bootstrap';

const Welcome = () => {
    const moneySpent = useRef();
    const description = useRef();
    const expenseCategory = useRef();
    const expenseCategories = ["Food", "Petrol", "Salary", "Rent", "Other"];

    return (
        <div className="welcome-container ">
            <div className='d-flex justify-content-between top'>
                <div>Welcome to Expense Tracker!!</div>
                <div className='d-flex'>
                    <div>Your Profile is incomplete!</div>
                    <Nav.Link className="text-primary" href='/profile'>Complete now</Nav.Link>
                </div>
            </div>

            <Form className="welcome-form d-flex">
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
            </Form>
        </div>
    );
};

export default Welcome;
