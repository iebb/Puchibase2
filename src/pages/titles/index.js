import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {Card, Divider, Header, Image, Pagination} from "semantic-ui-react";
import {DataPagination, TotalPages} from "../../utils/utils";
import {getTitleImage} from "../../services/xet";

@connect(({ titles, loading }) => ({
  titles,
  loading: loading.models.titles,

}))

export default class Titles extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      rowPerPage: 15,
    };
    props.dispatch({
      type: 'titles/fetch',
    });
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { getTitleMaster } = this.props.titles;
    const { activePage, rowPerPage } = this.state;

    const data = DataPagination(getTitleMaster, activePage, rowPerPage);
    const totalPages = TotalPages(getTitleMaster, rowPerPage);

    return (
      <div>
        <Header as="h2">Titles</Header>
        <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
        />
        <Divider />
        <Card.Group itemsPerRow={3} doubling stackable>
          {
            data.map(row => (
              <Card key={row.titleMstId}>
                <Card.Content>
                  <Image floated='left' size='tiny' src={getTitleImage(row.titleMstId)} />
                  <Card.Header>{row.titleName}</Card.Header>
                  <Card.Meta>#{row.titleMstId}</Card.Meta>
                  <Card.Description>{row.explanation}</Card.Description>
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




