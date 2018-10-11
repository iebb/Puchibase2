import React from 'react';
import {Button, Divider, Header, Label, Segment} from "semantic-ui-react";
import {t} from "../utils/languages";
import ReactTable from "react-table";
import {getLimit, getTarget} from "../utils/missions";
import Reward from "./Reward";
import {arrayToMap} from "../utils/utils";
import TZ from "./TZ";
import SUITable from "./SUITable";
import {parseEffectNesos} from "../utils/events";

export default class TowerEvent extends React.PureComponent {

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({...this.state, props})
  }

  render() {
    const {event, props} = this.props;

    const towerReward = arrayToMap(props.getTowerRewardMaster, "rewardId");
    const reward = arrayToMap(props.getRewardMaster, "rewardId");
    const areaColors = {
      1: "teal",
      2: "blue",
      3: "purple",
      101: "red",
      102: "orange",
      103: "yellow",
    };
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
        Header: t(["wording", "events", "stages", "areaShort"]),
        accessor: 'areaId',
        Cell: val => (
          <Label color={areaColors[val.value]}>{t(["wording", "events", "areas", val.value])}</Label>
        ),
        width: 50,
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
        Header: t(["wording", "events", "tower", "target3"]),
        Cell: val => (
          getTarget(val.original.actionTarget3, "targetShort")
        ),
      },
      {
        Header: t(["wording", "stages", "missionModal", "titles", "limitation"]),
        Cell: val => (
          getLimit(val.original.limitationType, "limitationShort")
        ),
      },
      {
        Header: t(["wording", "stages", "missionModal", "titles", "release"]),
        accessor: "releaseStartTime",
        Cell: val => <TZ short time={val.value * 1000} />,
      },
      {
        Header: t(["wording", "events", "tower", "reward1_short"]),
        accessor: 'rewardId1',
        Cell: val => (
          <Reward row={reward[val.value]} />
        ),
        width: 100,
      },
      {
        Header: t(["wording", "events", "tower", "reward2_short"]),
        accessor: 'rewardId2',
        Cell: val => (
          <Reward row={reward[val.value]} />
        ),
        width: 100,
      },
      {
        Header: t(["wording", "events", "tower", "reward3_short"]),
        accessor: 'rewardId3',
        Cell: val => (
          <Reward row={reward[val.value]} />
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
        Header: t(["wording", "events", "effect", "area"]),
        accessor: "areaId",
        Cell: val => (
          <div>

            <Label color={areaColors[val.value]}>{t(["wording", "events", "areasFull", val.value])}</Label>

            <Label color={areaColors[val.value + 100]}>{t(["wording", "events", "areasFull", val.value + 100])}</Label>
          </div>
          )
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
            data={event.missionTower}
            columns={missionColumns}
            defaultPageSize={10}
          />
        </Segment>
        <Segment>
          <Header as="h2">{t(["wording", "events", "effect", "bonus"])}</Header>
          <Divider/>
          <SUITable
            data={event.effect.filter(x => 0 < x.areaId && x.areaId < 4)}
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




