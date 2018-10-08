import React from 'react';
import {Container, Divider, Header, Label} from "semantic-ui-react";
import {t} from "../utils/languages";
import {f} from "../utils/utils";
import {getLimit, getTarget, getUnlockTarget} from "../utils/missions";

export default class Reward extends React.PureComponent {

  render() {
    const {data} = this.props;
    const limitStd = getLimit(data.limitationType, "limitationStandalone");
    const limit = getLimit(data.limitationType);
    const target = getTarget(data.actionTarget);
    const period = t(["mission", "period", data.periodCount]);
    const comb = f(t(["mission", "targetFormat"]), {...{limit}, ...{target}, ...{period}});

    let secretRelease = "";
    if (data.releaseSecretAction) {
      const unlockActions = getUnlockTarget(data.releaseSecretAction);
      console.log("act", unlockActions);
      const unlockLimit = getLimit(unlockActions.limit);
      const unlockTarget = getTarget(unlockActions.target);
      const unlockPeriod = t(["mission", "period", unlockActions.period]);
      secretRelease = f(t(["mission", "targetFormat"]), {
        ...{limit: unlockLimit},
        ...{target: unlockTarget},
        ...{period: unlockPeriod}
      });
    }

    return (
      <Container>
        <Header as="h3">
          {t(["wording", "stages", "missionModal", "titles", "mission"])} #{data.missionId}
          <Label color={(data.periodCount === 1) ? "blue" : "green"}>
            {(data.periodCount === 1) ? "1PLAY" : "TOTAL"}
          </Label>
        </Header>
        <p style={{color: "grey"}}>{data.contents}</p>
        <p style={{color: "grey"}}>{comb}</p>
        <Divider/>
        {
          data.releaseSecretAction && (
            <div>
              <Header as="h5">
                {t(["wording", "stages", "missionModal", "titles", "unlock"])}
              </Header>
              <p>{secretRelease}</p>
              <Divider/>
            </div>
          )
        }

        <Header as="h5">
          {t(["wording", "stages", "missionModal", "titles", "limitation"])}
        </Header>
        <p>{limitStd}</p>
        <Divider/>

        <Header as="h5">
          {t(["wording", "stages", "missionModal", "titles", "target"])}
        </Header>
        <p>{target}</p>
        <Divider/>

      </Container>
    );
  }
}




