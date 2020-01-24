import React, { } from "react";
import "rbx/index.css";
import {
  Navbar,
  Button,
  Heading,
} from "rbx";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Banner = ({ user, house }) => {
  return (
    <Navbar color='info'>
      <Navbar.Brand>
        <Navbar.Item>
          <Heading className='medium-font'>
            {!user ? "OneHouse" : user.displayName + "'s OneHouse"}
          </Heading>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Segment align="start">
          <Navbar.Item>
            {house ? house : ""}
          </Navbar.Item>
        </Navbar.Segment>
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
