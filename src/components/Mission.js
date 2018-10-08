import React from 'react';
import {Container, Divider, Header, Label, Modal} from "semantic-ui-react";
import {t} from "../utils/languages";
import {f} from "../utils/utils";
import {getLimit, getTarget} from "../utils/missions";

export default class Reward extends React.PureComponent {

  render() {
    const {data} = this.props;
    const limitStd = getLimit(data.limitationType, "limitationStandalone");
    const limit = getLimit(data.limitationType);
    const target = getTarget(data.actionTarget);
    const period = t(["mission", "period", data.periodCount]);
    const comb = f(t(["mission", "targetFormat"]), {...{limit}, ...{target}, ...{period}});
    return (
      <Container>
        <Header as="h3">
          {t(["wording", "stages", "missionModal", "titles", "mission"])} #{data.missionId}
          <Label color={(period === 1) ? "green" : "blue"}>
            {(period === 1) ? "1PLAY" : "TOTAL"}
          </Label>
        </Header>
        <p style={{color: "grey"}}>{data.contents}</p>
        <Divider/>
        <p style={{color: "grey"}}>{comb}</p>
        <Divider/>
        <Header as="h5">
          {t(["wording", "stages", "missionModal", "titles", "limitations"])}
        </Header>
        <p>
          {limitStd}
        </p>
        <Divider/>

        <Header as="h5">
          {t(["wording", "stages", "missionModal", "titles", "targets"])}
        </Header>
        <p>
          {target}
        </p>
        <Divider/>

      </Container>
    );
  }
}




