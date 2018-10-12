import {Table} from "semantic-ui-react";
import React from "react";
import {t} from "../utils/languages";

export default class ParamsTable extends React.PureComponent {

  render() {
    const {params} = this.props;

    return (
      <Table celled compact='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{t(["wording", "skills", "activeSkill", "key"])}</Table.HeaderCell>
            <Table.HeaderCell>{t(["wording", "skills", "activeSkill", "value"])}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            Object.keys(params).map(
              x =>
                <Table.Row key={x}>
                  <Table.Cell><b>{x}</b></Table.Cell>
                  <Table.Cell>{params[x] + ""}</Table.Cell>
                </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    );
  }
}
