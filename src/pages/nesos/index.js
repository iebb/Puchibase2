import React from 'react';
import {connect} from 'dva';
import {Button, Card, Divider, Grid, Header, Image, Pagination, Progress} from "semantic-ui-react";
import {DataPagination, TotalPages} from "../../utils/utils";
import {getGeneral, getSPRImage} from "../../services/xet";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";
import Link from "umi/link";

@connect(({ nesos, loading }) => ({
  nesos,
  loading: loading.models.nesos,

}))

export default class NesoIcons extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
    props.dispatch({
      type: 'nesos/fetch',
    });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({...this.state, props})
  }

  render() {

    const { data, getCostumeMaster } = this.props.nesos;

    if (data.length === 0) return (<Loading />);
    return (
      <div>
        <Header as="h2">{t(["wording", "menu", "nesos"])}</Header>

        <Divider />
        {
          getCostumeMaster.map(
            c => (
              <div key={c.costumeMstId}>
                <Grid columns={10} doubling>
                  <Grid.Row>
                    <Grid.Column>
                      <Image circular size="tiny" src={getGeneral("costumelistimage", c.costumeMstId, 5)} />
                    </Grid.Column>
                    {
                      data.filter(x => x.costumeMstId === c.costumeMstId).map(
                        x => (
                          <Grid.Column>
                            <Button as={Link} to={`/nesos/${x.memberMstId}`} circular style={{
                              margin: 0,
                              padding: "0.2em",
                            }}>
                              <Image circular size="tiny" src={getSPRImage(x.memberMstId)} />
                            </Button>
                          </Grid.Column>
                        )
                      )
                    }
                  </Grid.Row>
                </Grid>
                <Divider />
              </div>
            )
          )
        }
      </div>
    );
  }
}




