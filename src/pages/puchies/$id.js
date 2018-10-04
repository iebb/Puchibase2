import React from 'react';
import { connect } from 'dva';
import {
  Button,
  Card,
  Divider,
  Grid,
  Header, Icon,
  Image, Label,
  Modal,
  Pagination,
  Progress,
  Segment,
  Table
} from "semantic-ui-react";
import {arrayToMap, DataPagination, popBinaryMap, TotalPages} from "../../utils/utils";
import {getSkillCutinAImage, getSkillCutinBImage, getSPRImage, getTitleImage} from "../../services/xet";

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
    };
    props.dispatch({
      type: 'puchies/fetch',
    });
  }
  handleOpen = () => this.setState({ binmapModal: true });
  handleClose = () => this.setState({ binmapModal: false });


  renderModal() {
    const { binaryMap } = this.state;
    const bitMap = [];
    for(const ele of binaryMap.split("")) {
      const val = parseInt(ele, 16);
      for(const bit of [8, 4, 2, 1]) {
        bitMap.push(
          <Grid.Column width={1} style={{padding: 0, lineHeight: 1}}>
            <Label circular size="tiny" color={(val & bit) ? "red" : null} />
          </Grid.Column>
        );
      }
    }
    return (
      <Modal
        open={this.state.binmapModal}
        onClose={this.handleClose}
        size='small'
      >
        <Header icon='browser'>Binary Map</Header>
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
          <Button color='green' onClick={this.handleClose} inverted>
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
                      <Table.HeaderCell>Level</Table.HeaderCell>
                      <Table.HeaderCell>Effects</Table.HeaderCell>
                      <Table.HeaderCell>Req't</Table.HeaderCell>
                      {
                        binMap &&
                        <Table.HeaderCell>BinMap</Table.HeaderCell>
                      }
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {
                      puchi.skillActive.map(row => (
                        <Table.Row>
                          <Table.Cell>{row.skillLevel}</Table.Cell>
                          <Table.Cell>{row.explanation}</Table.Cell>
                          <Table.Cell>{row.num}</Table.Cell>
                          {
                            binMap &&
                            <Table.Cell>
                              <Button size="tiny" style={{
                                paddingTop: 4, paddingBottom: 4
                              }} onClick={() => {this.setState({binaryMap: row.binaryMap}); this.handleOpen();}}>

                                <span>
                                  {popBinaryMap(row.binaryMap)} / {row.effect.text}
                                </span>
                              </Button>
                            </Table.Cell>
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
              <Divider/>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}




