import React from 'react';
import {Button, Divider, Header, Label, Segment} from "semantic-ui-react";
import {t} from "../utils/languages";
import ReactTable from "react-table";
import {getMacaronTarget} from "../utils/missions";
import Reward from "./Reward";
import {arrayToMap} from "../utils/utils";
import TZ from "./TZ";
import SUITable from "./SUITable";
import {parseEffectNesos} from "../utils/events";

export default class MacaronEvent extends React.PureComponent {

  UNSAFE_componentWillReceiveProps(props) {
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

    const effectColumns = [
      {
        Header: "#",
        accessor: "eventEffectMstId",
        mobileOnly: true,
      },
      {
        Header: t(["wording", "events", "effect", "start"]),
        accessor: "eventEffectStartTime",
        Cell: val => <TZ time={val.value * 1000} />,
      },
      {
        Header: t(["wording", "events", "effect", "end"]),
        accessor: "eventEffectEndTime",
        Cell: val => <TZ time={val.value * 1000} />,
      },
      {
        Header: t(["wording", "events", "effect", "40"]),
        accessor: 'effect40',
        Cell: val => parseEffectNesos(val.value),
      },
      {
        Header: t(["wording", "events", "effect", "20"]),
        accessor: 'effect20',
        Cell: val => parseEffectNesos(val.value),
      },
      {
        Header: t(["wording", "events", "effect", "10"]),
        accessor: 'effect10',
        Cell: val => parseEffectNesos(val.value),
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
        <Segment>
          <Header as="h2">{t(["wording", "events", "effect", "bonus"])}</Header>
          <Divider/>
          <SUITable
            data={event.effect}
            columns={effectColumns}
            rowKey="eventEffectMstId"
            props={{
              celled: true,
              compact: "very",
            }}
          />
        </Segment>
      </div>
    );
  }
}




