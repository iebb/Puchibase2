import React from 'react';
import {Button, Divider, Header, Image, Label, Segment} from "semantic-ui-react";
import {getGeneral} from "../services/xet";
import {sprintf} from "sprintf-js";
import {t} from "../utils/languages";
import ReactTable from "react-table";
import {getLimit, getMacaronTarget, getTarget} from "../utils/missions";
import Reward from "./Reward";
import {arrayToMap} from "../utils/utils";
import TZ from "./TZ";

export default class MacaronEvent extends React.PureComponent {

  componentWillReceiveProps(props) {
    this.setState({...this.state, props})
  }

  render() {
    const {event, props} = this.props;

    const reward = arrayToMap(props.getRewardMaster, "rewardId");
    const missionColumns = [
      {
        Header: '#',
        accessor: 'missionId',
        width: 60,
        Cell: val => (
          <Label as={Button}>{val.original.mTypeId || val.value}</Label>
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
        Header: t(["wording", "stages", "missionModal", "titles", "release"]),
        accessor: "releaseStartTime",
        Cell: val => <TZ time={val.value * 1000} />,
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

    return (
      <div>
        <Segment>
          <Header as="h2">{t(["wording", "stages", "allMissions"])}</Header>
          <Divider/>
          <ReactTable
            data={event.missionMacaron}
            columns={missionColumns}
            defaultPageSize={10}
          />
        </Segment>
      </div>
    );
  }
}




