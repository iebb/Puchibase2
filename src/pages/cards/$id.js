import React from 'react';
import {connect} from 'dva';
import {Button, Card, Divider, Grid, Header, Icon, Image, Label, Modal, Segment, Table} from "semantic-ui-react";
import {arrayToMap, popBinaryMap} from "../../utils/utils";
import {getSkillCutinAImage, getSkillCutinBImage, getSPRImage} from "../../services/xet";
import {parseActiveTranslations, parsePassiveSkill, parseSkillRow} from "../../utils/skills";
import {t} from "../../utils/languages";
import SUITable from "../../components/SUITable";
import ParamsTable from "../../components/ParamsTable";
import Link from "umi/link";

@connect(({ cards, loading }) => ({
  cards,
  loading: loading.models.cards,
}))

export default class CardDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: props.id || props.match.params.id,
      binmapModal: false,
      binaryMap: "",
      paramsModal: false,
      params: {},
    };
    props.dispatch({
      type: 'cards/fetch',
    });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      currentCard: props.id || props.match.params.id,
      props
    });
  }

  handleBinMap = () => this.setState({ binmapModal: false });
  handleParams = () => this.setState({ paramsModal: false });

  nextItem = (data, offset) => {
    const prop = "currentCard";
    const key = "cardBaseId";

    let index = data.map(x => x[key].toString()).indexOf(this.state[prop]);

    index += offset;
    if (index >= data.length) index -= data.length;
    if (index < 0) index += data.length;

    return `/cards/${data[index][key]}`;
  };

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
        <Header>{t(["wording", "skills", "activeSkill", "binmap"])}</Header>
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
        <Header>{t(["wording", "skills", "activeSkill", "parameters"])}</Header>
        <Modal.Content>
          <ParamsTable params={params} />
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
    const data = arrayToMap(this.props.cards.data, "cardBaseId");
    const cardId = this.state.currentCard;
    const card = data[cardId];

    if (!(card && card.personal && card.costume )) {
      return null;
    }

    const activeSkillColumns = [
      {
        Header: t(["wording", "skills", "activeSkill", "levels"]),
        accessor: "skillLevel",
      },
      {
        Header: t(["wording", "skills", "activeSkill", "requirements"]),
        accessor: "num",
      }
    ];

    const skillLevels = card.skillActive.length;
    for(const key of Object.keys(card.skillActive[0].effect)) {
      if (key === "text") continue;
      const { transform } = parseSkillRow(key);
      if (card.skillActive[0].effect[key] !== card.skillActive[skillLevels - 1].effect[key]) {
        activeSkillColumns.push({
          Header: t(["wording", "skills", "activeSkillParams", key]),
          accessor: "effect",
          key: `effect${key}`,
          Cell: val => transform(val.value[key]),
        })
      }
    }


    if (card.skillActive[0].binaryMap) {
      activeSkillColumns.push({
        Header: t(["wording", "skills", "activeSkill", "binmap"]),
        accessor: "binaryMap",
        Cell: row => (
          <Button
            size="tiny"
            style={{
              paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8
            }}
            onClick={() => {this.setState({binaryMap: row.value, binmapModal: true});}}
          >
            <span>
              {`${
                popBinaryMap(row.value)
                } / ${
                t(["wording", "skills", "activeSkill", "range", row.original.effect.text])
                }`}
            </span>
          </Button>
        )
      })
    }


    activeSkillColumns.push({
      Header: t(["wording", "skills", "activeSkill", "parameters"]),
      accessor: "effect",
      Cell: row => (
        <Button
          size="tiny"
          style={{
            paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8
          }}
          onClick={() => {this.setState({params: row.value, paramsModal: true});}}>
          <span>{t(["wording", "skills", "activeSkill", "view"])}</span>
        </Button>
      )
    });

    return (
      <div>
        <Header as="h2">#{cardId} - {card.personal.personalName} - {card.costume.costumeName}</Header>

        {this.renderModal()}
        {this.renderParamsModal()}

        <Grid stackable>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Image width="50%" src={getSkillCutinAImage(card.cardBaseId)} />
                <Image width="50%" src={getSkillCutinBImage(card.cardBaseId)} />
                <Image width="100%" src={getSPRImage(card.cardBaseId)} />
                <Card.Header>{card.personal.personalName}</Card.Header>
                <Card.Meta>#{cardId}</Card.Meta>
                <Card.Description>{card.costume.costumeName}</Card.Description>
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Content>
                <Button
                  circular
                  floated="left"
                  basic
                  color="pink"
                  as={Link}
                  size="large"
                  icon="arrow left"
                  to={this.nextItem(this.props.cards.data,-1)}
                />
                <Button
                  circular
                  floated="left"
                  basic
                  color="pink"
                  as={Link}
                  size="large"
                  icon="angle left"
                  to={this.nextItem(this.props.cards.data.filter(x => x.personalMstId === card.personalMstId),-1)}
                />
                <Button
                  circular floated="right" basic color="purple" as={Link}
                  size="large" icon="arrow right"
                  to={this.nextItem(this.props.cards.data,1)}
                />
                <Button
                  circular floated="right" basic color="purple" as={Link}
                  size="large" icon="angle right"
                  to={this.nextItem(this.props.cards.data.filter(x => x.personalMstId === card.personalMstId),1)}
                />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <Header as="h2">{t(["wording", "cards", "activeSkill"])}</Header>
              <Divider/>
              <p>
                {t(["wording", "skills", "activeSkill", "effects"])}: {parseActiveTranslations(card.skillActive[0])}
              </p>
              <p>
                {card.skillActive[0].explanation}
              </p>
              <SUITable
                data={card.skillActive}
                columns={activeSkillColumns}
                rowKey="skillActiveMstId"
                props={{
                  celled: true,
                  compact: "very",
                  unstackable: true,
                }}
                scroll
              />
            </Segment>
            <Segment>
              <Header as="h2">{t(["wording", "cards", "passiveSkill"])}</Header>
              <Divider/>
              <div>
                <Table celled compact='very'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>{t(["wording", "skills", "passiveSkill", "levels"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "skills", "passiveSkill", "trigger"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "skills", "passiveSkill", "effects"])}</Table.HeaderCell>
                      <Table.HeaderCell>{t(["wording", "skills", "passiveSkill", "rate"])}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {
                      card.skillPassive.map(row => {
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




