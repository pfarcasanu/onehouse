import React, { Component, useState } from "react";
import "rbx/index.css";
import {
  Notification,
  Title,
  Content,
  Block,
  Message,
  Button,
  Column
} from "rbx";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Banner = ({ user }) => {
  if (user) {
    return <User user={user} />;
  } else {
    return <NoUser />;
  }
};

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const NoUser = () => {
  return (
    <React.Fragment>
      <Block></Block>
      <Column size={8} offset={2}>
        <Notification color="link">
          <Title>OneHouse</Title>
          <Content>The best way to shop for your home!</Content>
          <SignIn />
        </Notification>
      </Column>
      <Block></Block>
    </React.Fragment>
  );
};

const User = ({ user }) => {
  return (
    <React.Fragment>
      <Block></Block>
      <Column size={8} offset={2}>
        <Notification color="link">
          <Title>{user.displayName}'s OneHouse</Title>
          <Content>Add items to get started!</Content>
          <Button inverted color="link" primary onClick={() => firebase.auth().signOut()}>
            Log out
          </Button>
        </Notification>
      </Column>
      <Block></Block>
    </React.Fragment>
  );
};

const SignIn = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

export default Banner;
