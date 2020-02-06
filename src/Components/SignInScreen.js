import React, { useState, useEffect } from "react";
import {
  Column,
  Button,
  Modal,
  Container,
  Image,
  Delete,
  Notification,
  Block,
  Heading,
  Card,
  Content,
  Divider,
  Level,
  Title,
  Box,
  List
} from "rbx";

const SignInScreen = ({ user }) => {
  let name = user.displayName.split(" ");
  let first = name[0];

  return (
    <Container>
      <Title size={2}>Welcome {first}!</Title>
      <Block />
      <Title subtitle size={4}>
        To get started:
      </Title>
      <Column.Group>
        <Column size={4} offset={1}>
          <Notification color="info">
              <Notification color="light">
              <Title size={3}>Create a House</Title>
              </Notification>
              <Content textAlign="left">
                  <ul>
                      <li><Title size={4} substitle> Create a House</Title></li>
                      <Block/>
                      <li><Title size={4} substitle> Select a House Key and Password</Title></li>
                      <Block/>
                      <li><Title size={4} substitle> Share your Housekey with your Roomates</Title></li>
                      <Block/>
                      <li><Title size={4} substitle> Get Shopping!</Title></li>
                  </ul>
              </Content>
          </Notification>
        </Column>
        <Column align="centered" size={2} offset={0}>
        </Column>
        <Column size={4} offset={0}>
          <Notification color="info">
              <Notification color="light">
              <Title size={3}> Join a House</Title>
              </Notification>
              <Content textAlign="left">
                  <ul>
                      <li><Title size={4} substitle> Join a House</Title></li>
                      <Block/>
                      <li><Title size={4} substitle> Get your House Name and Password from your roomates</Title></li>
                      <Block/>
                      <li><Title size={4} substitle> Enter your House Name and Password</Title></li>
                      <Block/>
                      <li><Title size={4} substitle> Get Shopping!</Title></li>
                  </ul>
              </Content>
          </Notification>
        </Column>
      </Column.Group>
    </Container>
  );
};

export default SignInScreen;
