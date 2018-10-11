import React from 'react';
import {connect} from 'dva';
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Modal,
  Segment,
  Table
} from "semantic-ui-react";
import {arrayToMap} from "../../utils/utils";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";
import 'moment-timezone';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import {sprintf} from "sprintf-js";
import Reward from "../../components/Reward";
import Mission from "../../components/Mission";
import {getLimit, getTarget} from "../../utils/missions";
import TZ from "../../components/TZ";

@connect(({ stages, loading }) => ({
  stages,
  loading: loading.models.stages,
}))

export default class StageDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentStage: props.id || props.match.params.id,
      showModal: false,
      modalRow: null,
      showCombined: true,
    };
    props.dispatch({
      type: 'stages/fetch',
    });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      currentStage: props.id || props.match.params.id,
      props
    });
  }

  handleClose = () => this.setState({ showModal: false });

  renderModal() {
    return (
      <Modal
        open={this.state.showModal}
        onClose={this.handleClose}
        size='small'
      >
        <Header>{t(["wording", "stages", "missionModal", "title"])}</Header>
        <Modal.Content>
          <Mission data={this.state.modalRow} />
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }


  render() {
    const data = arrayToMap(this.props.stages.data, "stageMstId");
    const stageId = this.state.currentStage;
    const stage = data[stageId];

    if (!stage) return <Loading />;
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
        Cell: val => (
          getTarget(val.original.actionTarget, "targetShort")
        ),
      },
      {
        Header: t(["wording", "stages", "missionModal", "titles", "limitation"]),
        Cell: val => (
          getLimit(val.original.limitationType, "limitationShort")
        ),
      },
      {
        Header: t(["wording", "stages", "missionModal", "titles", "reward"]),
        accessor: 'itemMstId',
        Cell: val => (
          <Reward item={val.value} count={val.original.itemNum}/>
        ),
        width: 100,
      },
    ];

    const combined = [];
    if (this.state.showCombined) {
      for(const row of JSON.parse(JSON.stringify(stage.missions))) {
        row.mTypeId = sprintf("%03d", row.missionId);
        combined.push(row);
      }
      for(const row of JSON.parse(JSON.stringify(stage.secrets))) {
        row.mTypeId = sprintf("S%02d", row.missionId);
        combined.push(row);
      }
      for(const row of JSON.parse(JSON.stringify(stage.extras))) {
        row.mTypeId = sprintf("E%02d", row.missionId);
        combined.push(row);
      }
    }

    return (
      <div>
        <Header as="h2">#{stageId} - {stage.stageName}</Header>

        {this.renderModal()}

        <Grid stackable>
          <Grid.Column width={4}>
            <Card fluid>
              <Image fluid rounded src={stage.stageIcon} />
              <Card.Content>
                <Card.Header>{stage.stageName}</Card.Header>
                <Card.Meta>#{stageId}</Card.Meta>
              </Card.Content>
            </Card>

            <Segment>
              <Checkbox toggle label={t(["wording", "stages", "showCombined"])}
                        onChange={() => this.setState({ showCombined: !this.state.showCombined })}
                        checked={this.state.showCombined} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            {
              this.state.showCombined ? (
                <Segment>
                  <Header as="h2">{t(["wording", "stages", "allMissions"])}</Header>
                  <Divider/>
                  <ReactTable
                    data={combined}
                    columns={missionColumns}
                    defaultPageSize={10}
                  />
                </Segment>
              ) : (
                <div>
                  <Segment>
                    <Header as="h2">{t(["wording", "stages", "missions"])}</Header>
                    <Divider/>
                    <ReactTable
                      data={stage.missions}
                      columns={missionColumns}
                      defaultPageSize={5}
                    />
                  </Segment>
                  <Segment>
                    <Header as="h2">{t(["wording", "stages", "secrets"])}</Header>
                    <Divider/>
                    <ReactTable
                      data={stage.secrets}
                      columns={missionColumns}
                      defaultPageSize={5}
                    />
                  </Segment>
                  <Segment>
                    <Header as="h2">{t(["wording", "stages", "extras"])}</Header>
                    <Divider/>
                    <ReactTable
                      data={stage.extras}
                      columns={missionColumns}
                      defaultPageSize={5}
                    />
                  </Segment>
                </div>
              )
            }
            <Segment>
              <Header as="h2">{t(["wording", "stages", "schedule", "__title"])}</Header>
              <Divider/>
              <Table compact="very">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>{t(["wording", "stages", "schedule", "num"])}</Table.HeaderCell>
                    <Table.HeaderCell>{t(["wording", "stages", "schedule", "start"])}</Table.HeaderCell>
                    <Table.HeaderCell>{t(["wording", "stages", "schedule", "end"])}</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    stage.schedules.map((x, idx) => (
                      <Table.Row key={x.seasonStartTime}>
                        <Table.Cell>
                          {idx + 1}
                        </Table.Cell>
                        <Table.Cell>
                          <TZ time={x.seasonStartTime * 1000} />
                        </Table.Cell>
                        <Table.Cell>
                          <TZ time={x.seasonEndTime * 1000} />
                        </Table.Cell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}




