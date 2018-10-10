import React from 'react';
import {connect} from 'dva';
import {Button, Card, Divider, Grid, Header, Icon, Image, Label, Modal, Segment, Table} from "semantic-ui-react";
import {arrayToMap, popBinaryMap} from "../../utils/utils";
import {getSkillCutinAImage, getSkillCutinBImage, getSPRImage} from "../../services/xet";
import {parsePassiveSkill} from "../../utils/skills";
import {t} from "../../utils/languages";

@connect(({ nesos, loading }) => ({
  nesos,
  loading: loading.models.nesos,
}))

export default class NesoDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    const nesoId = props.id || props.match.params.id;
    this.state = {
      currentNeso: nesoId,
      binmapModal: false,
      binaryMap: "",
      paramsModal: false,
      params: {},
    };
    props.dispatch({
      type: 'nesos/fetch',
    });
  }

  componentWillReceiveProps(props) {
    this.setState({...this.state, props})
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
          <Grid.Column key={totalbits} width={1} style={{padding: 0, lineHeight: 0}}>
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
        <Header>{t(["wording", "nesos", "activeSkill", "binmap"])}</Header>
        <Modal.Content>
          <div style={{padding: "1em", overflowX: "auto", overflowY: "auto"}}>
            <Grid style={{width: "22.857143em", margin: 5}}>
              {
                bitMap
              }
            </Grid>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleBinMap} inverted>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  renderParamsModal() {
    const { params } = this.state;
    return (
      <Modal
        open={this.state.paramsModal}
        onClose={this.handleParams}
        size='small'
      >
        <Header>{t(["wording", "nesos", "activeSkill", "parameters"])}</Header>
        <Modal.Content>
          <Table celled compact='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{t(["wording", "nesos", "activeSkill", "key"])}</Table.HeaderCell>
                <Table.HeaderCell>{t(["wording", "nesos", "activeSkill", "value"])}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                  Object.keys(params).map(
                    x =>
                      <Table.Row key={x}>
                        <Table.Cell><b>{x}</b></Table.Cell>
                        <Table.Cell>{params[x] + ""}</Table.Cell>
                      </Table.Row>
                  )
                }
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleParams} inverted>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    const data = arrayToMap(this.props.nesos.data, "memberMstId");
    const nesoId = this.state.currentNeso;
    const neso = data[nesoId];

    if (!(neso && neso.personal && neso.costume )) {
      return null;
    }
    const binMap = neso.skillActive[0].binaryMap;
    return (
      <div>
        <Header as="h2">#{nesoId} - {neso.personal.personalName} - {neso.costume.costumeName}</Header>

        {this.renderModal()}
        {this.renderParamsModal()}

        <Grid stackable>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Image width="50%" src={getSkillCutinAImage(neso.memberMstId)} />
                <Image width="50%" src={getSkillCutinBImage(neso.memberMstId)} />
                <Image width="100%" src={getSPRImage(neso.memberMstId)} />
                <Card.Header>{neso.personal.personalName}</Card.Header>
                <Card.Meta>#{nesoId}</Card.Meta>
                <Card.Description>{neso.costume.costumeName}</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <Header as="h2">{t(["wording", "nesos", "activeSkill", "__title"])}</Header>
              <Divider/>
              <div>
                <Table celled compact='very'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>{t(["wording", "nesos", "activeSkill", "levels"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "nesos", "activeSkill", "requirements"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "nesos", "activeSkill", "effects"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "nesos", "activeSkill", "parameters"])}</Table.HeaderCell>
                      {
                        binMap ?
                        <Table.HeaderCell>{t(["wording", "nesos", "activeSkill", "binmap"])}</Table.HeaderCell>
                          : null
                      }
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {
                      neso.skillActive.map(row => (
                        <Table.Row key={row.skillActiveMstId}>
                          <Table.Cell>{row.skillLevel}</Table.Cell>
                          <Table.Cell>{row.num}</Table.Cell>
                          <Table.Cell>{row.explanation}</Table.Cell>
                          <Table.Cell>
                            <a onClick={() => {this.setState({params: row.effect, paramsModal: true});}}>
                              {t(["wording", "nesos", "activeSkill", "view"])}
                            </a>
                          </Table.Cell>
                          {
                            binMap ?
                            <Table.Cell>
                              <Button size="tiny" style={{
                                paddingTop: 4, paddingBottom: 4
                              }} onClick={() => {this.setState({binaryMap: row.binaryMap, binmapModal: true});}}>

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
            </Segment>
            <Segment>
              <Header as="h2">{t(["wording", "nesos", "passiveSkill", "__title"])}</Header>
              <Divider/>
              <div>
                <Table celled compact='very'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>{t(["wording", "nesos", "passiveSkill", "levels"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "nesos", "passiveSkill", "trigger"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "nesos", "passiveSkill", "effects"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "nesos", "passiveSkill", "rate"])}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {
                      neso.skillPassive.map(row => {
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
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}




