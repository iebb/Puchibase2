import NavLink from 'umi/navlink';
import {Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import styles from "./index.less";

const Layout = (props) => {
  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image
              size='mini'
              src='https://puchi-xet.loveliv.es/sprawlpict/sprawlpict10003101.png'
              style={{ marginRight: '1.5em' }}

            />
            Puchibase v2
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/titles" activeClassName={styles.activeLink}>
              Titles
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/puchies" activeClassName={styles.activeLink}>
              Puchies
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/cards" activeClassName={styles.activeLink}>
              Cards
            </NavLink>
          </Menu.Item>
        </Container>
      </Menu>

      <Container style={{ marginTop: '3em' }}>
        { props.children }
      </Container>

      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
          <List horizontal inverted divided link>
            <List.Item as='a' href='https://ur.mk/'>
              Another ieb Project
            </List.Item>
            <List.Item as='a' href='https://github.com/iebb/Puchibase2'>
              <Icon name='github' /> Github
            </List.Item>
            <List.Item as='a' href='mailto:ieb@outlook.my'>
              Contact Me
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>

  );
};

export default Layout;
