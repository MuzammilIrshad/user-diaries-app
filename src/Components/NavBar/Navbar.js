import React from "react";
import * as nav from "./Navbar.module.css";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavBar() {
  const user = useSelector((state) => state.diaries.user);

  return (
    <div>
      <Navbar className={nav.main_div}>
        <Container>
          <Navbar.Brand id={nav.nav_link}>
            <Link to="/diaries" className={nav.text}>
              Dashboard
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
