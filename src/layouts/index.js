import NavLink from 'umi/navlink';
import React from "react";
import ReactGA from 'react-ga';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Flag,
  Header,
  Icon,
  Image,
  List,
  Menu, Message,
  Modal,
  Segment
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import styles from "./index.less";
import {lang, languages, t} from "../utils/languages";
import {getGeneral} from "../services/xet";
import {getMasterData} from "../services/api";
import {toggleTimezone, useJST} from "../utils/utils";
import {getMainMenu} from "../utils/menu";

ReactGA.initialize('UA-20909424-23');
ReactGA.pageview(window.location.pathname + window.location.search);

export default class Layout extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      language: localStorage.getItem("language") || "en-US",
      useJST: useJST(),
      showModal: false,
    }
  }

  handleClose = () => this.setState({ showModal: false });

  renderModal() {
    return (
      <Modal
        open={this.state.showModal}
        onClose={this.handleClose}
        size='small'
      >
        <Header>{t(["wording", "settings", "title"])}</Header>
        <Modal.Content>
          <Header as={"h3"} content={t(["wording", "settings", "timezone"])}/>
          <p>{t(["wording", "settings", "currentTimezone"])} {localStorage.timeZone}</p>
          <Checkbox
            toggle
            label={t(["wording", "settings", "useJST"])}
            onChange={e => {
              this.setState({useJST: toggleTimezone()})
            }}
            checked={this.state.useJST}
          />
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
    getMasterData();
    const currentLang = languages[lang()];
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item header as={NavLink} to="/" activeClassName={styles.activeLink}>
                <Image
                  size='mini'
                  src={getGeneral("sprawlpict", "10003101")}
                  style={{marginRight: '1.5em', display: "inline"}}
                />
                <span>
                  Puchibase v2
                </span>
            </Menu.Item>
            {
              getMainMenu().filter(x => !x.hideMenu).map(item => item.path ? (
                <Menu.Item as={NavLink} key={item.name} to={item.path}>
                  {item.translated}
                </Menu.Item>
              ) : (
                <Menu.Item as={"a"} key={item.name} href={item.href}>
                  {item.translated}
                </Menu.Item>
              ))
            }
          </Container>
        </Menu>


        <Container style={{marginTop: '3em'}}>

          {
            (Math.random() < 0.2) && <Message icon>
              <Icon name='circle notched' loading />
              <Message.Content>
                <Message.Header>{t(["wording", "message", "newWebsite"])}</Message.Header>
                <p>
                  {t(["wording", "message", "newWebsiteDescription1"])}
                  <br/>
                  {t(["wording", "message", "newWebsiteDescription2"])}
                  <br/>
                  <a href="https://github.com/iebb/Puchibase2/issues">https://github.com/iebb/Puchibase2/issues</a>
                </p>
              </Message.Content>
            </Message>
          }

          {this.renderModal()}

          {React.cloneElement(this.props.children, { language: this.state.language, useJST: this.state.useJST })}

        </Container>

        <Segment inverted vertical style={{margin: '5em 0em 0em', padding: '5em 0em'}}>
          <Container textAlign='center'>
            <List horizontal inverted divided link>
              <List.Item as='a' href='https://ur.mk/'>
                Another ieb Project
              </List.Item>
              <List.Item as='a' href='https://github.com/iebb/Puchibase2'>
                <Icon name='github'/> Github
              </List.Item>
              <List.Item as='a' href='https://github.com/iebb/Puchibase2/issues'>
                <Icon name='github'/> Bug Report / Feature Request
              </List.Item>
              <List.Item as={"a"} href="https://puchi-legacy.loveliv.es/">
                {t(["wording", "menu", "legacyWebsite"])}
              </List.Item>
            </List>
            <Divider/>
            <List horizontal inverted divided link>
              {
                Object.keys(languages).map(x => (
                  <List.Item as='a' key={x} onClick={() => {
                    localStorage.setItem("language", x);
                    this.setState({language: x})
                  }}><Flag name={languages[x].meta.flag}/></List.Item>
                ))
              }

              <List.Item as={"a"} onClick={() => {this.setState({ showModal: true })}}>
                {t(["wording", "settings", "showSettings"])}
              </List.Item>
            </List>
            <Divider/>
            <p>{currentLang.meta.language} by {currentLang.meta.translator}</p>
          </Container>
        </Segment>
      </div>

    );
  }
}
