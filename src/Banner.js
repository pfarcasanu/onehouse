import React, { Component, useState } from "react";
import "rbx/index.css";
import {
  Navbar,
  Button,
} from "rbx";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Banner = ({ user, house }) => {
  return (
    <Navbar color='info'>
      <Navbar.Brand>
        <Navbar.Item href="#">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt=""
            role="presentation"
            width="112"
            height="28"
          />
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Segment align="end">
          <Navbar.Item>
            {!user ? <SignIn/> :
            <Logout user={user} house={house}/>}
          </Navbar.Item>
        </Navbar.Segment>
      </Navbar.Menu>
    </Navbar>
  );
};

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Logout = ({ user, house }) => {
  return (
    <Button
      color="primary"
      primary
      onClick={() => firebase.auth().signOut()}
    >
      Log out
    </Button>
  );
};

const SignIn = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

export default Banner;
