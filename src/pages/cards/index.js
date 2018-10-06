import React from 'react';
import {connect} from 'dva';
import {Card, Divider, Header, Image, Pagination, Progress, Tab} from "semantic-ui-react";
import {DataPagination, TotalPages} from "../../utils/utils";
import {getCardSmallImage} from "../../services/xet";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";

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

    const { data } = this.props.cards;

    const pageData = DataPagination(data, activePage, rowPerPage);
    const totalPages = TotalPages(data, rowPerPage);

    if (pageData.length === 0) return (<Loading />);
    return (
      <div>
        <Header as="h2">{t(["wording", "menu", "cards"])}</Header>
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
                <Card.Content>
                  <Card.Header>{cards.data[0].cardName}</Card.Header>
                  <div style={{width: "100%", overflow: "hidden"}}>
                    <Image src={getCardSmallImage(cards.data[0].cardMstId)} style={{
                      objectFit: "cover",
                      marginTop: "-21.8%",
                      marginBottom: "-21.8%",
                      width: "100%"
                    }}/>
                  </div>
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
          firstItem={null}
          lastItem={null}
        />
      </div>
    );
  }
}




