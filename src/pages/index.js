import Redirect from 'umi/redirect';
import {Card, Image} from "semantic-ui-react";
import {t} from "../utils/languages";
import {getGeneral} from "../services/xet";
import Link from "umi/link";
import React from "react";

export default () => {
  const links = [
    {
      link: "/nesos",
      name: t(["wording", "menu", "nesos"]),
      description: t(["wording", "menu", "nesos"]),
      image: getGeneral("sprawlpict", "10003101"),
    },
    {
      link: "/cards",
      name: t(["wording", "menu", "cards"]),
      description: t(["wording", "menu", "cards"]),
      image: getGeneral("cardsmall", "100100036"),
    },
    {
      link: "/stages",
      name: t(["wording", "menu", "stages"]),
      description: t(["wording", "menu", "stages"]),
      image: getGeneral("stageselect", "10003001"),
    },
    {
      link: "/achievements",
      name: t(["wording", "menu", "achievements"]),
      description: t(["wording", "menu", "achievements"]),
      image: getGeneral("achievement", "00010000"),
    },
  ];
  return (
    <Card.Group itemsPerRow={3} doubling stackable>
      {
        links.map(x => (
          <Card to={x.link} as={Link} key={x.link}>
            <Card.Content>
              <Image rounded floated='right' size="tiny" src={x.image} />
              <Card.Header>{x.name}</Card.Header>
              <Card.Description>{x.description}</Card.Description>
            </Card.Content>
          </Card>
        ))
      }
    </Card.Group>
  );

}
