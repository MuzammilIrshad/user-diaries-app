import React from "react";
import * as login from "./Login.module.css";
import Form from "react-bootstrap/Form";
//import FormControl from 'react-bootstrap/FormControl'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addUser } from '../store/Slice';
import { useDispatch } from 'react-redux';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(addUser(email))
  };
  
  return (
    <>
      <div className={login.main_div}>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
            className={login.fields}
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className={login.fields}
          >
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </FloatingLabel>
          <Form.Control type="submit" value="Submit" id={login.submitBtn} />
        </Form>
        <p>
          Don't have an account?<Link to="/signup">Create Account</Link>
        </p>
      </div>
    </>
  );
}
