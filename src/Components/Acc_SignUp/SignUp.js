import React from "react";
import * as signUp from "./Signup.module.css";
import Form from "react-bootstrap/Form";
//import FormControl from 'react-bootstrap/FormControl'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
//import Login from "./Login";
import { Link } from "react-router-dom";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, name);
  };
  return (
    <div className={signUp.main_div}>
      <h1>SignUp for Account</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
          className={signUp.fields}
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
          className={signUp.fields}
        >
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingName"
          label="Name"
          className={signUp.fields}
        >
          <Form.Control
            type="text"
            placeholder="Full Name"
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
        </FloatingLabel>
        <Form.Control type="submit" value="Submit" id={signUp.submitBtn} />
      </Form>
      <p>
        Already have an account?<Link to="/">Signin</Link>
      </p>
    </div>
  );
}
