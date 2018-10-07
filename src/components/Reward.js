import React from 'react';
import {Label} from "semantic-ui-react";
import {getGeneral} from "../services/xet";
import {sprintf} from "sprintf-js";

export default class Reward extends React.PureComponent {
  render() {
    return (
      <Label image>
        <img src={getGeneral("item", sprintf("%08d", this.props.item))} />
        {this.props.count}
      </Label>
    );
  }
}




