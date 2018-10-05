import React from 'react';
import {connect} from 'dva';
import {Card, Divider, Header, Image, Pagination, Progress} from "semantic-ui-react";
import {DataPagination, TotalPages} from "../../utils/utils";
import {getSPRImage} from "../../services/xet";
import NavLink from "umi/navlink";
import {t} from "../../utils/languages";

@connect(({ puchies, loading }) => ({
  puchies,
  loading: loading.models.puchies,

}))

export default class Puchies extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      rowPerPage: 16,
    };
    props.dispatch({
      type: 'puchies/fetch',
    });
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { activePage, rowPerPage } = this.state;

    const { data } = this.props.puchies;

    const pageData = DataPagination(data, activePage, rowPerPage);
    const totalPages = TotalPages(data, rowPerPage);

    return (
      <div>
        <Header as="h2">{t(["wording", "menu", "puchies"])}</Header>
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
            pageData.map(row => (
              <Card key={row.memberMstId}>
                <Card.Content>
                  <Image floated='left' size='tiny' src={getSPRImage(row.memberMstId)} />
                  <Card.Header>
                    <NavLink to={`/puchies/${row.memberMstId}`}>
                      {row.personal && row.personal.personalName}
                    </NavLink>
                  </Card.Header>
                  <Card.Meta>#{row.memberMstId}</Card.Meta>
                  <Card.Description>{row.costume && row.costume.costumeName}</Card.Description>
                  <Card.Description>
                    <Progress percent={(100.0 * (row.scoreInitial + 49 * row.scoreRise) / 1500)} color='green' size="tiny">
                      SCORE: {row.scoreInitial} / {row.scoreInitial + 49 * row.scoreRise} (+{row.scoreRise})
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
          firstItem={null}
          lastItem={null}
        />
      </div>
    );
  }
}




