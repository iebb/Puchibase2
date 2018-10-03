import React from 'react';
import { connect } from 'dva';
import {Card, Divider, Header, Image, Pagination, Progress, Tab} from "semantic-ui-react";
import {arrayToMap, DataPagination, TotalPages} from "../../utils/utils";
import {getCardSmallImage, getSPRImage} from "../../services/xet";

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
    };
    props.dispatch({
      type: 'cards/fetch',
    });
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { activePage, rowPerPage } = this.state;

    console.log(this.props.cards);
    const { data } = this.props.cards;

    const pageData = DataPagination(data, activePage, rowPerPage);
    const totalPages = TotalPages(data, rowPerPage);

    return (
      <div>
        <Header as="h2">Cards</Header>
        <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
        />
        <Divider />
        <Card.Group itemsPerRow={4} doubling stackable>
          {
            pageData.map(cards => (
              <Card key={cards.cardBaseId}>
                <Card.Content>
                  <Card.Header>{cards.data[0].cardName}</Card.Header>
                  <Image src={getCardSmallImage(cards.data[0].cardMstId)} />
                </Card.Content>
                <Card.Content>
                <Tab menu={{ secondary: true, pointing: true }} panes={
                  cards.data.map(row => (
                    {
                      menuItem: `${row.rarity}★`,
                      render: () => <Tab.Pane attached={false}>
                          <Card.Meta>#{row.cardMstId}</Card.Meta>
                          <Card.Description>{row.cardName}</Card.Description>
                          <Card.Description>
                            <Progress percent={(100.0 * (row.score) / 300)} color='green' size="tiny">
                              SCORE: {row.score}
                            </Progress>
                          </Card.Description>
                      </Tab.Pane>
                    }
                  ))
                } />
                </Card.Content>
              </Card>

            ))
          }
        </Card.Group>
        <Divider />
        <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
        />
      </div>
    );
  }
}




