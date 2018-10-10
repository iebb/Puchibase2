import React from 'react';
import {connect} from 'dva';
import {Button, Card, Checkbox, Grid, Header, Icon, Image, Modal, Segment} from "semantic-ui-react";
import {arrayToMap} from "../../utils/utils";
import {t} from "../../utils/languages";
import Loading from "../../components/Loading";
import 'moment-timezone';
import 'react-table/react-table.css'
import Mission from "../../components/Mission";
import MacaronEvent from "../../components/MacaronEvent";
import {getSpGeneral} from "../../services/xet";
import TowerEvent from "../../components/TowerEvent";

@connect(({ events, loading }) => ({
  events,
  loading: loading.models.events,
}))

export default class EventDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    const eventId = props.id || props.match.params.id;
    this.state = {
      currentEvent: eventId,
      useJST: false,
      localZone: require('moment-timezone').tz.guess(),
      showModal: false,
      modalRow: null,
      showCombined: true,
    };
    props.dispatch({
      type: 'events/fetch',
    });
  }

  componentWillReceiveProps(p) {
    this.setState({...this.state, props: p})
  }

  handleClose = () => this.setState({ showModal: false });

  renderModal() {
    return (
      <Modal
        open={this.state.showModal}
        onClose={this.handleClose}
        size='small'
      >
        <Header>{t(["wording", "events", "missionModal", "title"])}</Header>
        <Modal.Content>
          <Mission data={this.state.modalRow} />
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }


  render() {
    const data = arrayToMap(this.props.events.data, "eventId");
    console.log(data);
    const eventId = this.state.currentEvent;
    const event = data[eventId];

    if (!event) return <Loading />;

    return (
      <div>
        <Header as="h2">#{eventId} - {event.eventName}</Header>

        {this.renderModal()}

        <Grid stackable>
          <Grid.Column width={4}>
            <Card fluid>
              <Image fluid rounded src={getSpGeneral("homeeventbanner", event.eventId)} />
              <Card.Content>
                <Card.Header>{event.eventName}</Card.Header>
                <Card.Meta>#{eventId}</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            {
              event.eventType === 1 ? (
                <MacaronEvent event={event} props={this.props.events}/>
              ) : (event.eventType === 2 ? (
                <TowerEvent event={event} props={this.props.events}/>
              ) : (""))
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}




