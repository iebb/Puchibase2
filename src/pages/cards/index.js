import React from 'react';
import {connect} from 'dva';
import {Button, Card, Divider, Header, Icon, Image, Label, Modal, Pagination, Progress, Tab} from "semantic-ui-react";
import {arrayToMap, DataPagination, TotalPages} from "../../utils/utils";
import {getCardCroppedSmallImage, getCardSmallImage} from "../../services/xet";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";
import ParamsTable from "../../components/ParamsTable";
import Skill from "../../components/Skill";

@connect(({ cards, loading }) => ({
  cards,
  loading: loading.models.cards,

}))

export default class Cards extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      rowPerPage: 16,
      skillSpecial: {},
      skillSpecialModal: false,
    };
    props.dispatch({
      type: 'cards/fetch',
    });
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  renderSkillSpecialModal = () => (
    <Modal
      open={this.state.skillSpecialModal}
      onClose={() => this.setState({skillSpecialModal: false})}
      size='small'
    >
      <Header>{t(["wording", "skills", "activeSkill", "parameters"])}</Header>
      <Modal.Content>
        <Skill data={this.state.skillSpecial} />
      </Modal.Content>
    </Modal>
  );

  render() {
    const { activePage, rowPerPage } = this.state;

    const { data, getCardExperienceMaster } = this.props.cards;

    const levels = arrayToMap(getCardExperienceMaster, "level");

    const pageData = DataPagination(data, activePage, rowPerPage);
    const totalPages = TotalPages(data, rowPerPage);

    if (pageData.length === 0) return (<Loading />);
    return (
      <div>
        <Header as="h2">{t(["wording", "menu", "cards"])}</Header>

        {this.renderSkillSpecialModal()}

        <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
          firstItem={null}
          lastItem={null}
        />
        <Divider />
        <Card.Group itemsPerRow={4} doubling stackable>
          {
            pageData.map(cards => (
              <Card key={cards.cardBaseId}>
                <Image
                  fluid
                  label={
                    cards.data[0].skillSpecial.length ?
                      { color: 'pink', content: '', icon: 'magic', corner: "left" } :
                      undefined
                  }
                  src={getCardCroppedSmallImage(cards.data[0].cardMstId)}
                />
                <Card.Content>
                  <Card.Header>{cards.data[0].cardName}</Card.Header>
                </Card.Content>
                <Tab menu={{ secondary: true, pointing: true }} panes={
                  cards.data.map(row => (
                    {
                      menuItem: `${row.rarity}★`,
                      render: () => {
                        const score = Math.floor(row.score * levels[10 * row.rarity].scoreGrowthRate / 1000);
                        // console.log(row);
                        return (
                          <Tab.Pane attached={false} style={{border: "none"}}>
                            <Card.Meta>#{row.cardMstId}</Card.Meta>
                            <Card.Description>
                              <Progress percent={(100.0 * score / 1000)} color='green' size="tiny">
                                {t(["wording", "cards", "maxScore"])}: {score}
                              </Progress>
                              {(row.skillSpecial.length + row.skillPassive.length > 0) && <Divider />}
                            </Card.Description>
                            {
                              (row.skillSpecial.length > 0) && (
                                <Card.Description>
                                  <span className="line">
                                    <Button
                                      color="pink" size="mini"
                                      style={{paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4}}
                                      onClick={() => {
                                      this.setState({
                                        skillSpecial: row.skillSpecial[0], skillSpecialModal: true
                                      })
                                    }}>
                                      {t(["wording", "cards", "specialSkillLabel"])}
                                    </Button>
                                  </span> <span className="line">{row.skillSpecial[0].name}</span>
                                  {(row.skillPassive.length > 0) && <Divider />}
                                </Card.Description>
                              )
                            }
                            {
                              (row.skillPassive.length > 0) && (
                                <Card.Description>
                                  <span className="line">
                                    <Button
                                      color="orange" size="mini"
                                      style={{paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4}}
                                    >
                                      {t(["wording", "cards", "passiveSkillLabel"])}
                                    </Button>
                                  </span> <span className="line">{row.skillPassive[0].name}</span>
                                </Card.Description>
                              )
                            }
                          </Tab.Pane>
                        );
                      }
                    }
                  ))
                } />
              </Card>

            ))
          }
        </Card.Group>
        <Divider />
        <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
          firstItem={null}
          lastItem={null}
        />
      </div>
    );
  }
}




