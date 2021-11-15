import React from "react";
import * as login from "./Login.module.css";
import Form from "react-bootstrap/Form";
//import FormControl from 'react-bootstrap/FormControl'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { addUser } from "../store/Slice";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { Alert } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(email, password);
    //setError('');
    //setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch(addUser({ id: res.user?.uid }));
        return history.push("/diaries");
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };
  console.log(error);
  return (
    <>
      <div className={login.main_div}>
        <h1 style={{ color: "#eff7f7", textAlign: "center" }}>Login</h1>
        {error && (
          <Alert variant="danger" style={{ textAlign: "center" }}>
            {error}
          </Alert>
        )}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className={`mb-3 ${login.fields1}`}
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
        <p style={{ color: "azure", textAlign: "center", marginTop: "8px" }}>
          Don't have an account?
          <Link to="/signup" style={{ color: "#0a58ca" }}>
            Create Account
          </Link>
        </p>
      </div>
    </>
  );
}
