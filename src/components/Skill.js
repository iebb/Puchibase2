import React from 'react';
import {Container, Divider, Header, Label} from "semantic-ui-react";
import {t} from "../utils/languages";
import {f} from "../utils/utils";
import {getLimit, getTarget, getUnlockTarget} from "../utils/missions";
import ParamsTable from "./ParamsTable";

export default class Skill extends React.PureComponent {

  render() {
    const {data} = this.props;
    data.effect = data.effect || JSON.parse(data.effectData);

    return (
      <Container>
        <Header as="h3">
          {data.name}
          <Label color="green">
            {t(["wording", "skills", "level"])} {data.skillLevel}
          </Label>
        </Header>
        <p style={{color: "grey"}}>{data.explanation}</p>
        <ParamsTable params={data.effect} />
      </Container>
    );
  }
}




