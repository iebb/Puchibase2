import React from 'react';
import {connect} from 'dva';
import {Card, Divider, Header, Image, Pagination} from "semantic-ui-react";
import {DataPagination, TotalPages} from "../../utils/utils";
import {getTitleImage} from "../../services/xet";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";

@connect(({ achievements, loading }) => ({
  achievements,
  loading: loading.models.achievements,

}))

export default class Achievements extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      rowPerPage: 15,
    };
    props.dispatch({
      type: 'achievements/fetch',
    });
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { getTitleMaster } = this.props.achievements;
    const { activePage, rowPerPage } = this.state;

    const pageData = DataPagination(getTitleMaster, activePage, rowPerPage);
    const totalPages = TotalPages(getTitleMaster, rowPerPage);

    if (pageData.length === 0) return (<Loading />);
    return (
      <div>
        <Header as="h2">{t(["wording", "menu", "achievements"])}</Header>
        <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
          firstItem={null}
          lastItem={null}
        />
        <Divider />
        <Card.Group itemsPerRow={3} doubling stackable>
          {
            pageData.map(row => (
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
          firstItem={null}
          lastItem={null}
        />
      </div>
    );
  }
}




