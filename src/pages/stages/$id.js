import React from 'react';
import {connect} from 'dva';
import {Card, Checkbox, Divider, Grid, Header, Image, Segment, Table} from "semantic-ui-react";
import {arrayToMap} from "../../utils/utils";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";
import Moment from "react-moment";
import 'moment-timezone';

@connect(({ stages, loading }) => ({
  stages,
  loading: loading.models.stages,
}))

export default class StageDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    const stageId = props.id || props.match.params.id;
    this.state = {
      currentStage: stageId,
      useJST: false,
      localZone: require('moment-timezone').tz.guess(),
    };
    props.dispatch({
      type: 'stages/fetch',
    });
  }
  toggle = () => this.setState({ useJST: !this.state.useJST })

  render() {
    const data = arrayToMap(this.props.stages.data, "stageMstId");
    const stageId = this.state.currentStage;
    const stage = data[stageId];

    if (!stage) return <Loading />;
    const tz = this.state.useJST ? "Asia/Tokyo" : this.state.localZone;

    return (
      <div>
        <Header as="h2">#{stageId} - {stage.stageName}</Header>

        <Grid stackable>
          <Grid.Column width={4}>
            <Card fluid>
              <Image fluid rounded src={stage.stageIcon} />
              <Card.Content>
                <Card.Header>{stage.stageName}</Card.Header>
                <Card.Meta>#{stageId}</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <Header as="h2">{t(["wording", "stages", "missions", "__title"])}</Header>
              <Divider/>

            </Segment>
            <Segment>
              <Header as="h2">{t(["wording", "stages", "secrets", "__title"])}</Header>
              <Divider/>

            </Segment>
            <Segment>
              <Header as="h2">{t(["wording", "stages", "schedule", "__title"])}</Header>
              <Divider/>
              <Checkbox toggle label={t(["wording", "stages", "schedule", "useJST"])} onChange={this.toggle} checked={this.state.useJST} />
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
                      <Table.Row>
                        <Table.Cell>
                          {idx + 1}
                        </Table.Cell>
                        <Table.Cell>
                          <Moment format="YYYY-MM-DD HH:mm:ss zz" tz={tz}>{x.seasonStartTime * 1000}</Moment>
                        </Table.Cell>
                        <Table.Cell>
                          <Moment format="YYYY-MM-DD HH:mm:ss zz" tz={tz}>{x.seasonEndTime * 1000}</Moment>
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




