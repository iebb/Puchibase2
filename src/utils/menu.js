import {t} from "./languages";
import {getGeneral} from "../services/xet";
import Link from "umi/link";

export function getMainMenu() {
  return [
    {
      name: "nesos",
      path: "/nesos",
      translated: t(["wording", "menu", "nesos"]),
      description: t(["wording", "menuDescription", "nesos"]),
      image: getGeneral("sprawlpict", "10003101"),
      type: Link,
    },
    {
      name: "nesoStats",
      path: "/nesos/stats",
      hideMenu: true,
      translated: t(["wording", "menu", "nesoStats"]),
      description: t(["wording", "menuDescription", "nesoStats"]),
      image: getGeneral("sprawlpict", "10007107"),
      type: Link,
    },
    {
      name: "cards",
      path: "/cards",
      translated: t(["wording", "menu", "cards"]),
      description: t(["wording", "menuDescription", "cards"]),
      image: getGeneral("cardsmall", "100100036"),
      type: Link,
    },
    {
      name: "stages",
      path: "/stages",
      translated: t(["wording", "menu", "stages"]),
      description: t(["wording", "menuDescription", "stages"]),
      image: getGeneral("stageselect", "10003001"),
      type: Link,
    },
    {
      name: "events",
      path: "/events",
      translated: t(["wording", "menu", "events"]),
      description: t(["wording", "menuDescription", "events"]),
      image: getGeneral("homeeventbanner", "00010001"),
      type: Link,
    },
    {
      name: "achievements",
      path: "/achievements",
      translated: t(["wording", "menu", "achievements"]),
      description: t(["wording", "menuDescription", "achievements"]),
      image: getGeneral("achievement", "00010000"),
      type: Link,
    },
    {
      name: "legacyWebsite",
      href: "https://puchi-legacy.loveliv.es/",
      translated: t(["wording", "menu", "legacyWebsite"]),
      description: t(["wording", "menuDescription", "legacyWebsite"]),
      image: getGeneral("achievement", "00010000"),
      type: "a",
    },
    {
      name: "github",
      href: "https://github.com/iebb/Puchibase2/",
      translated: t(["wording", "menu", "github"]),
      description: t(["wording", "menuDescription", "github"]),
      image: "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png",
      type: "a",
    },
  ];
}
