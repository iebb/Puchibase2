import React from 'react';
import {Button, Divider, Header, Image, Label, Segment} from "semantic-ui-react";
import {getGeneral} from "../services/xet";
import {sprintf} from "sprintf-js";
import {t} from "../utils/languages";
import ReactTable from "react-table";
import {getLimit, getMacaronTarget, getTarget} from "../utils/missions";
import Reward from "./Reward";
import {arrayToMap} from "../utils/utils";

export default class MacaronEvent extends React.PureComponent {
  render() {
    const {event, props} = this.props;
/*
    const reward = arrayToMap(props.getRewardMaster, "rewardId");
    const missionColumns = [
      {
        Header: '#',
        accessor: 'missionId',
        width: 60,
        Cell: val => (
          <Label as={Button} onClick={
            () => {this.setState({modalRow: val.original, showModal: true})}
          }>{val.original.mTypeId || val.value}</Label>
        ),
      },
      {
        Header: 'T',
        accessor: 'periodCount',
        Cell: val => (
          (val.value === 1) ?
            <Label color="blue">1</Label> :
            <Label color="green">T</Label>
        ),
        width: 40,
      },
      {
        Header: t(["wording", "stages", "missionModal", "titles", "target"]),
        accessor: "actionTarget",
        Cell: val => (
          getMacaronTarget(val.value, val.original)
        ),
      },
      {
        Header: t(["wording", "stages", "missionModal", "titles", "reward"]),
        accessor: 'rewardMstId',
        Cell: val => (
          <Reward item={reward[val.value].itemMstId} count={reward[val.value].num} />
        ),
        width: 100,
      },
    ];

    TODO: tower event
*/
    return (
      <div>
        <Segment>
          <h1>Work in Progress</h1>
        </Segment>
      </div>
    );
  }
}




