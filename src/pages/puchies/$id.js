import React from 'react';
import {connect} from 'dva';
import {Button, Card, Divider, Grid, Header, Icon, Image, Label, Modal, Segment, Table} from "semantic-ui-react";
import {arrayToMap, popBinaryMap} from "../../utils/utils";
import {getSkillCutinAImage, getSkillCutinBImage, getSPRImage} from "../../services/xet";
import {parsePassiveSkill} from "../../utils/skills";
import {t} from "../../utils/languages";

@connect(({ puchies, loading }) => ({
  puchies,
  loading: loading.models.puchies,
}))

export default class PuchiDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    const puchiId = props.id || props.match.params.id;
    this.state = {
      currentPuchi: puchiId,
      binmapModal: false,
      binaryMap: "",
      paramsModal: false,
      params: {},
    };
    props.dispatch({
      type: 'puchies/fetch',
    });
  }

  handleBinMap = () => this.setState({ binmapModal: false });
  handleParams = () => this.setState({ paramsModal: false });


  renderModal() {
    const { binaryMap } = this.state;
    const bitMap = [];
    let totalbits = 0;
    for(const ele of binaryMap.split("")) {
      const val = parseInt(ele, 16);
      for(const bit of [8, 4, 2, 1]) {
        bitMap.push(
          <Grid.Column key={totalbits} width={1} style={{padding: 0, lineHeight: 1}}>
            <Label circular size="tiny" color={(val & bit) ? "red" : null} />
          </Grid.Column>
        );
        totalbits += 1;
      }
    }
    return (
      <Modal
        open={this.state.binmapModal}
        onClose={this.handleBinMap}
        size='small'
      >
        <Header>{t(["wording", "puchies", "activeSkill", "binmap"])}</Header>
        <Modal.Content>
          <div style={{padding: "1em", overflowX: "scroll"}}>
            <Grid style={{width: 20*16}}>
              {
                bitMap
              }
            </Grid>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleBinMap} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  renderParamsModal() {
    console.log(this.state);
    const { params } = this.state;
    return (
      <Modal
        open={this.state.paramsModal}
        onClose={this.handleParams}
        size='small'
      >
        <Header>{t(["wording", "puchies", "activeSkill", "parameters"])}</Header>
        <Modal.Content>
          <Table celled compact='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{t(["wording", "puchies", "activeSkill", "key"])}</Table.HeaderCell>
                <Table.HeaderCell>{t(["wording", "puchies", "activeSkill", "value"])}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                  Object.keys(params).map(
                    x =>
                      <Table.Row key={x}>
                        <Table.Cell><b>{x}</b></Table.Cell>
                        <Table.Cell>{params[x]}</Table.Cell>
                      </Table.Row>
                  )
                }
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleParams} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    const { activePage, rowPerPage } = this.state;
    const data = arrayToMap(this.props.puchies.data, "memberMstId");
    const puchiId = this.state.currentPuchi;
    const puchi = data[puchiId];

    if (!(puchi && puchi.personal && puchi.costume )) {
      return null;
    }
    const binMap = puchi.skillActive[0].binaryMap;
    return (
      <div>
        <Header as="h2">#{puchiId} - {puchi.personal.personalName} - {puchi.costume.costumeName}</Header>

        {this.renderModal()}
        {this.renderParamsModal()}

        <Grid stackable>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Image width="50%" src={getSkillCutinAImage(puchi.memberMstId)} />
                <Image width="50%" src={getSkillCutinBImage(puchi.memberMstId)} />
                <Image width="100%" src={getSPRImage(puchi.memberMstId)} />
                <Card.Header>{puchi.personal.personalName}</Card.Header>
                <Card.Meta>#{puchiId}</Card.Meta>
                <Card.Description>{puchi.costume.costumeName}</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <Header as="h2">Main Skill</Header>
              <Divider/>
              <div>
                <Table celled compact='very'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>{t(["wording", "puchies", "activeSkill", "levels"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "puchies", "activeSkill", "requirements"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "puchies", "activeSkill", "effects"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "puchies", "activeSkill", "parameters"])}</Table.HeaderCell>
                      {
                        binMap ?
                        <Table.HeaderCell>{t(["wording", "puchies", "activeSkill", "binmap"])}</Table.HeaderCell>
                          : null
                      }
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {
                      puchi.skillActive.map(row => (
                        <Table.Row key={row.skillActiveMstId}>
                          <Table.Cell>{row.skillLevel}</Table.Cell>
                          <Table.Cell>{row.num}</Table.Cell>
                          <Table.Cell>{row.explanation}</Table.Cell>
                          <Table.Cell>
                            <a onClick={() => {this.setState({params: row.effect, paramsModal: true});}}>
                              {t(["wording", "puchies", "activeSkill", "view"])}
                            </a>
                          </Table.Cell>
                          {
                            binMap ?
                            <Table.Cell>
                              <Button size="tiny" style={{
                                paddingTop: 4, paddingBottom: 4
                              }} onClick={() => {this.setState({binaryMap: row.binaryMap, binMapModal: true});}}>

                                <span>
                                  {popBinaryMap(row.binaryMap)} / {row.effect.text}
                                </span>
                              </Button>
                            </Table.Cell>
                              : null
                          }
                        </Table.Row>
                      ))
                    }
                  </Table.Body>
                </Table>
              </div>
              <Divider/>
            </Segment>
            <Segment>
              <Header as="h2">Support Skill</Header>
              <Divider/>
              <div>
                <Table celled compact='very'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Level</Table.HeaderCell>
                      <Table.HeaderCell>Trigger</Table.HeaderCell>
                      <Table.HeaderCell>Effects</Table.HeaderCell>
                      <Table.HeaderCell>Rate</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {
                      puchi.skillPassive.map(row => {
                        const parsed = parsePassiveSkill(row);
                        return (
                          <Table.Row key={row.skillPassiveMstId}>
                            <Table.Cell>{row.level}</Table.Cell>
                            <Table.Cell>{parsed.trigger}</Table.Cell>
                            <Table.Cell>{parsed.type}</Table.Cell>
                            <Table.Cell>{parsed.rate}</Table.Cell>
                          </Table.Row>
                        )
                      })
                    }
                  </Table.Body>
                </Table>
              </div>
              <Divider/>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}




