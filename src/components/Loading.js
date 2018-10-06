import React from 'react';
import {Container, Header, Loader} from "semantic-ui-react";

export default class Loading extends React.PureComponent {
  render() {
    return (
      <Container style={{textAlign: "center"}}>
        <Header as="h1">Loading...</Header>
        <Loader active content='Loading' inline='centered' />
      </Container>
    );
  }
}




