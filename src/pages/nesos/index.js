import React from 'react';
import {connect} from 'dva';
import {Card, Divider, Header, Image, Pagination, Progress} from "semantic-ui-react";
import {DataPagination, TotalPages} from "../../utils/utils";
import {getSPRImage} from "../../services/xet";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";
import Link from "umi/link";

@connect(({ nesos, loading }) => ({
  nesos,
  loading: loading.models.nesos,

}))

export default class Nesos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      rowPerPage: 16,
    };
    props.dispatch({
      type: 'nesos/fetch',
    });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({...this.state, props})
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { activePage, rowPerPage } = this.state;

    const { data } = this.props.nesos;

    const pageData = DataPagination(data, activePage, rowPerPage);
    const totalPages = TotalPages(data, rowPerPage);

    if (pageData.length === 0) return (<Loading />);
    return (
      <div>
        <Header as="h2">{t(["wording", "menu", "nesos"])}</Header>
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
              <Card key={row.memberMstId} to={`/nesos/${row.memberMstId}`} as={Link}>
                <Card.Content>
                  <Image floated='left' size='tiny' src={getSPRImage(row.memberMstId)} />
                  <Card.Header>
                    {row.personal && row.personal.personalName}
                  </Card.Header>
                  <Card.Meta>#{row.memberMstId}</Card.Meta>
                  <Card.Description>{row.costume && row.costume.costumeName}</Card.Description>
                  <Card.Description>
                    <span style={{fontSize: "80%"}}>
                      {t(["wording", "nesos", "list", "activeSkill"])}: {row.skillActive[0].name}
                      <br/>
                      {t(["wording", "nesos", "list", "passiveSkill"])}: {row.skillPassive[0].name}
                    </span>
                  </Card.Description>
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




