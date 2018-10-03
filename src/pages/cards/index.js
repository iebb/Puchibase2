import React from 'react';
import { connect } from 'dva';
import {Card, Divider, Header, Image, Pagination, Progress} from "semantic-ui-react";
import {arrayToMap, DataPagination, TotalPages} from "../../utils/utils";
import {getSPRImage} from "../../services/xet";

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


  process(prop) {
    const { getMemberMaster, getPersonalMaster, getCostumeMaster } = prop;
    const personalMap = arrayToMap(getPersonalMaster, "personalMstId");
    const costumeMap = arrayToMap(getCostumeMaster, "costumeMstId");
    for (let row of getMemberMaster) {
      row.personal = personalMap[row.personalMstId];
      row.costume = costumeMap[row.costumeMstId];
    }
    return getMemberMaster;
  }


  render() {
    const { activePage, rowPerPage } = this.state;

    const data = this.process(this.props.cards);

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
        <Card.Group itemsPerRow={4}>
          {
            pageData.map(row => (
              <Card key={row.memberMstId}>
                <Card.Content>
                  <Image floated='left' size='tiny' src={getSPRImage(row.memberMstId)} />
                  <Card.Header>{row.personal && row.personal.personalName}</Card.Header>
                  <Card.Meta>#{row.memberMstId}</Card.Meta>
                  <Card.Description>{row.costume && row.costume.costumeName}</Card.Description>
                  <Card.Description>
                    <Progress percent={(100.0 * (row.scoreInitial + 49 * row.scoreRise) / 1500)} color='green' size="tiny">
                      SCORE: {row.scoreInitial} / {row.scoreInitial + 24 * row.scoreRise} / {row.scoreInitial + 49 * row.scoreRise}
                    </Progress>
                  </Card.Description>
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




