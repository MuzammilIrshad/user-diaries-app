import React, { useEffect } from "react";
import * as signUp from "./Signup.module.css";
import Form from "react-bootstrap/Form";
//import FormControl from 'react-bootstrap/FormControl'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
//import Login from "./Login";
import { Link, useHistory } from "react-router-dom";
//import { useDispatch } from "react-redux";
//import { addUser } from "../store/Slice";
import { auth } from "../../firebase";
import { Alert } from "react-bootstrap";

export default function CreateAccount() {
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>();
  const history = useHistory();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(email, password, name);
    
      setError('');
      setLoading(true);
      auth.createUserWithEmailAndPassword(email,password).then((res)=>{
       return history.push("/");
      }).catch((err)=>{
          setError(err.message);
          console.log(err)
      });
    
    setLoading(false);
  };
  useEffect(()=>{
       
    const unsubscribe = auth.onAuthStateChanged((user)=>{
            setCurrentUser(user);
            console.log(user)
    })
    console.log(currentUser)
      return unsubscribe;
  })
  return (
    <div className={signUp.main_div}>
      <h1 style={{color: '#eff7f7',textAlign: 'center'}}>SignUp for Account</h1>
      {error && <Alert variant="danger" style={{textAlign:"center"}}>{error}</Alert>}
      <Form onSubmit={(e)=>handleSubmit(e)}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className={`mb-3 ${signUp.fields}`} 
          
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
        <Form.Control type="submit" value="Submit" id={signUp.submitBtn} disabled={loading}/>
      </Form>
      <p style={{color: 'azure',textAlign: 'center',marginTop: '8px'}}>
        Already have an account?<Link to="/" style={{color: '#0a58ca'}}>Signin</Link>
      </p>
    </div>
  );
}
