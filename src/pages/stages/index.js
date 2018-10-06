import React from 'react';
import {connect} from 'dva';
import {Card, Divider, Header, Image, Pagination, Progress} from "semantic-ui-react";
import {DataPagination, TotalPages} from "../../utils/utils";
import {getSPRImage, getStageImage} from "../../services/xet";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";
import Link from "umi/link";

@connect(({ stages, loading }) => ({
  stages,
  loading: loading.models.stages,

}))

export default class Stages extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      rowPerPage: 8,
    };
    props.dispatch({
      type: 'stages/fetch',
    });
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { activePage, rowPerPage } = this.state;

    const { data } = this.props.stages;
    console.log(this.props);

    const pageData = DataPagination(data, activePage, rowPerPage);
    const totalPages = TotalPages(data, rowPerPage);

    if (pageData.length === 0) return (<Loading />);
    return (
      <div>
        <Header as="h2">{t(["wording", "menu", "stages"])}</Header>
        <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
          firstItem={null}
          lastItem={null}
        />
        <Divider />
        <Card.Group itemsPerRow={2} doubling stackable>
          {
            pageData.map(row => {

              const stageImage = row.stageMstId % 1000 === 1 ? getStageImage(row.stageMstId): "https://via.placeholder.com/80x80";
              const missionsCnt = row.missions.length;
              const secretsCnt = row.secrets.length;
              return (
                <Card key={row.stageMstId} as={Link} to={`/stages/${row.stageMstId}`}>
                  <Card.Content>
                    <Image floated='left' size='tiny' rounded src={stageImage} />
                    <Card.Header>
                      {row.stageName}
                    </Card.Header>
                    <Card.Meta>#{row.stageMstId}</Card.Meta>
                    <Card.Description>
                      {
                        row.members.map(x => (
                          <Image src={getSPRImage(x.memberMstId)} size="mini"/>
                        ))
                      }
                    </Card.Description>
                    <Card.Description>
                      <Progress percent={(100.0 * (missionsCnt) / (missionsCnt + secretsCnt))} color='blue' size="tiny">
                        {missionsCnt} {t(["wording", "stages", "normalMission"])} + {secretsCnt} {t(["wording", "stages", "secretMission"])}
                      </Progress>
                    </Card.Description>
                  </Card.Content>
                </Card>
              );

            })
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




