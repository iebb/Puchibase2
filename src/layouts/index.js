import NavLink from 'umi/navlink';
import React from "react";
import ReactGA from 'react-ga';
import {Container, Divider, Flag, Icon, Image, List, Menu, Segment} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import styles from "./index.less";
import {lang, t, languages} from "../utils/languages";
import {getGeneral} from "../services/xet";
import {getMasterData} from "../services/api";

ReactGA.initialize('UA-20909424-23');
ReactGA.pageview(window.location.pathname + window.location.search);

export default class Layout extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      language: localStorage.getItem("language") || "en-US",
    }
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
            <Menu.Item as={NavLink} to="/achievements" activeClassName={styles.activeLink}>
                {t(["wording", "menu", "achievements"])}
            </Menu.Item>
            <Menu.Item as={NavLink} to="/nesos" activeClassName={styles.activeLink}>
                {t(["wording", "menu", "nesos"])}
            </Menu.Item>
            <Menu.Item as={NavLink} to="/cards" activeClassName={styles.activeLink}>
                {t(["wording", "menu", "cards"])}
            </Menu.Item>
            <Menu.Item as={NavLink} to="/stages" activeClassName={styles.activeLink}>
                {t(["wording", "menu", "stages"])}
            </Menu.Item>
          </Container>
        </Menu>

        <Container style={{marginTop: '3em'}}>
          {React.cloneElement(this.props.children, { language: this.state.language })}
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
              <List.Item as='a' href='mailto:ieb@outlook.my'>
                Contact Me
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
            </List>
            <Divider/>
            <p>{currentLang.meta.language} by {currentLang.meta.translator}</p>
          </Container>
        </Segment>
      </div>

    );
  }
}
