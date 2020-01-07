import React, { Component, useState } from "react";
import "rbx/index.css";
import { Container, Notification, Title, Content, Block} from "rbx";

const Banner = () => {
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

    </React.Fragment>
  );
};

export default Banner;
