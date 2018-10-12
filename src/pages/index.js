import {Card, Image} from "semantic-ui-react";
import Link from "umi/link";
import React from "react";
import {getMainMenu} from "../utils/menu";

export default () => {
  return (
    <Card.Group itemsPerRow={4} doubling stackable>
      {
        getMainMenu().map(x => (
          <Card to={x.path} href={x.href} as={x.type} key={x.name}>
            <Card.Content>
              <Image rounded floated='right' size="tiny" src={x.image} />
              <Card.Header>{x.translated}</Card.Header>
              <Card.Meta>{x.description}</Card.Meta>
            </Card.Content>
          </Card>
        ))
      }
    </Card.Group>
  );

}
