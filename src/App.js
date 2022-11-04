import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { gapi } from "gapi-script";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import Login from "./component/Login"
import Logout from "./component/Logout"

import MoviesList from "./component/MoviesList.js"
import Movie from "./component/Movie.js"
import AddReview from "./component/AddReview.js"

import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId:
      clientId,
    plugin_name:"chat"
  })
})

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <Navbar bg="primary" expand="lg" sticky="top" variant="dark" >
          <Container className="container-fluid">
            <Navbar.Brand className="brand" href="/">
              <img src="/images/movies-logo.png" alt="movies logo" className="moviesLogo"/>
              MOVIE TIME
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="ml-auto">
              <Nav.Link as={Link}  to={"/movies"}>
                Movies
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          { user ? (
                  <Logout setUser={setUser} />
                ) : (
                  <Login setUser={setUser} />
                )}
          </Container>
        </Navbar>

        <Routes>
          <Route exact path={"/"} element={
            <MoviesList />}
            />
          <Route exact path={"/movies"} element={
            <MoviesList />}
            />
          <Route exact path={"/movies/:id"} element={
            <Movie user = {user} />}
            />
          <Route exact path={"/movies/:id/review"} element={
            <AddReview user = {user} />}
            />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
