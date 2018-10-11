import React from 'react';
import {Image, Label} from "semantic-ui-react";
import {getGeneral} from "../services/xet";
import {sprintf} from "sprintf-js";

export default class Reward extends React.PureComponent {
  render() {
    const {row, item, count} = this.props;
    if (row) {
      if (row.itemMstId) {
        return (
          <Label image>
            <Image src={getGeneral("item", sprintf("%08d", row.itemMstId))} />
            {row.num}
          </Label>
        );
      } else {
        console.error("Unable to decode reward", row);
        return (
          <Label>
            ?
          </Label>
        );
      }
    }

    return (
      <Label image>
        <Image src={getGeneral("item", sprintf("%08d", item))} />
        {count}
      </Label>
    );
  }
}




