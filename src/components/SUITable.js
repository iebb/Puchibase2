import React from 'react';
import {Responsive, Table} from "semantic-ui-react";
import {PredefinedResponsive} from "../utils/responsive";

export default class SUITable extends React.PureComponent {
  render() {
    const {columns, data, rowKey, rowKeyFn} = this.props;
    const getKey = (col, rid) => (
      col.key ? col.key :
        col.name ? col.name :
          col.accessor ? col.accessor :
            col.Header ? col.Header : rid
    );
    const getRowKey = (row, rid) => (
      rowKey ? row[rowKey] :
        rowKeyFn ? rowKeyFn(row) :
          row.key ? row.key : rid
    );
    const col = columns.filter(x => !x.mobileOnly);
    return (
      <div>
        <Responsive as={"div"} {...PredefinedResponsive.mobileMinus}>
          <Table celled compact='very'>
            <Table.Body>
              {
                data.map((row, id) => (
                  <Table.Row key={getRowKey(row, id)}>
                    {
                      columns.map((c, rid) => {
                        let data = "";
                        if (c.Cell) {
                          const obj = {
                            original: row,
                            value: row[c.accessor],
                          };
                          data = c.Cell(obj);
                        } else if (c.accessor) {
                          data = row[c.accessor];
                        }
                        return <Table.Cell key={getKey(c, rid)}><b>{c.Header}:</b> {data}</Table.Cell>;
                      })
                    }
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        </Responsive>
        <Responsive as={"div"} {...PredefinedResponsive.tabletPlus}>
          <Table celled compact='very'>
            <Table.Header>
              <Table.Row>
                {
                  col.map((c, rid) => (
                    <Table.HeaderCell key={getKey(c, rid)}>{c.Header}</Table.HeaderCell>
                  ))
                }
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                data.map((row, id) => (
                  <Table.Row key={getRowKey(row, id)}>
                    {
                      columns.filter(x => !x.mobileOnly).map((c, rid) => {
                        let data = "";
                        if (c.Cell) {
                          const obj = {
                            original: row,
                            value: row[c.accessor],
                          };
                          data = c.Cell(obj);
                        } else if (c.accessor) {
                          data = row[c.accessor];
                        }
                        return <Table.Cell key={getKey(c, rid)}>{data}</Table.Cell>;
                      })
                    }
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        </Responsive>
      </div>
    );
  }
}




