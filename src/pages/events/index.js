import React from 'react';
import {connect} from 'dva';
import {Card, Divider, Header, Image, Label, Pagination, Progress} from "semantic-ui-react";
import {DataPagination, TotalPages} from "../../utils/utils";
import {getGeneral, getSpGeneral, getSPRImage} from "../../services/xet";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";
import Link from "umi/link";
import {Table} from "semantic-ui-react/dist/commonjs/collections/Table/Table";
import TZ from "../../components/TZ";

@connect(({ events, loading }) => ({
  events,
  loading: loading.models.events,
}))



export default class Events extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      rowPerPage: 8,
    };
    props.dispatch({
      type: 'events/fetch',
    });
  }

  UNSAFE_componentWillReceiveProps(props, ctx) {
    this.setState({...this.state, props})
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { activePage, rowPerPage } = this.state;
    const { data } = this.props.events;

    const pageData = DataPagination(data, activePage, rowPerPage);
    const totalPages = TotalPages(data, rowPerPage);

    const eventTypes = [
      {}, {
        name: t(["wording", "events", "types", "1"]),
        color: "purple",
      }, {
        name: t(["wording", "events", "types", "2"]),
        color: "blue",
      }
    ];

    if (pageData.length === 0) return (<Loading />);
    return (
      <div>
        <Header as="h2">{t(["wording", "menu", "events"])}</Header>
        <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
          firstItem={null}
          lastItem={null}
        />
        <Divider />
        <Card.Group itemsPerRow={2} stackable>
          {
            pageData.map(row => {

              return (
                <Card
                  key={row.eventId} as={Link} to={`/events/${row.eventId}`}
                >


                  <Card.Content>
                    <Label
                      color={eventTypes[row.eventType].color}
                      content={eventTypes[row.eventType].name}
                      ribbon
                      style={{width: "8em"}}
                    />
                    <div style={{clear: "both"}} />
                    <Image floated='left' size='tiny' rounded src={getSpGeneral("homeeventbanner", row.eventId)} />
                    <Card.Header>
                      {row.eventName}
                    </Card.Header>
                    <Card.Meta>
                      #{row.eventCycleMstId}
                      <p>
                        <TZ time={row.eventStartTime * 1000} />
                        {" - "}
                        <TZ time={row.eventEndTime * 1000} />
                      </p>
                    </Card.Meta>
                    <Card.Description>
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




