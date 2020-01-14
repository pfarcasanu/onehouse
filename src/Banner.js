import React, { Component, useState } from "react";
import "rbx/index.css";
import { Notification, Title, Content, Block, Message, Button} from "rbx";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Banner = ({user}) => {
  return (
    <React.Fragment>
      <Block>
      </Block>
      <Notification color="warning">
        <Title>OneHouse</Title>
        <Content>
            The best way to shop for your home!
        </Content>
      </Notification>
      
      {user ? <Welcome user={user} /> : <SignIn />}

      </React.Fragment>
  );
};

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const SignIn = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

export default Banner;
