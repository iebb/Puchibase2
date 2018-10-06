import React from 'react';
import {Header, Loader} from "semantic-ui-react";

export default class Loading extends React.PureComponent {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Header as="h1">Loading...</Header>
        <Loader content='Loading' />
      </div>
    );
  }
}




