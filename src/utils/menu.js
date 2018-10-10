import {t} from "./languages";
import {getGeneral} from "../services/xet";
import Link from "umi/link";

export const mainMenu = [
  {
    name: "nesos",
    path: "/nesos",
    translated: t(["wording", "menu", "nesos"]),
    description: t(["wording", "menu", "nesos"]),
    image: getGeneral("sprawlpict", "10003101"),
    type: Link,
  },
  {
    name: "cards",
    path: "/cards",
    translated: t(["wording", "menu", "cards"]),
    description: t(["wording", "menu", "cards"]),
    image: getGeneral("cardsmall", "100100036"),
    type: Link,
  },
  {
    name: "stages",
    path: "/stages",
    translated: t(["wording", "menu", "stages"]),
    description: t(["wording", "menu", "stages"]),
    image: getGeneral("stageselect", "10003001"),
    type: Link,
  },
  {
    name: "events",
    path: "/events",
    translated: t(["wording", "menu", "events"]),
    description: t(["wording", "menu", "events"]),
    image: getGeneral("homeeventbanner", "00010001"),
    type: Link,
  },
  {
    name: "achievements",
    path: "/achievements",
    translated: t(["wording", "menu", "achievements"]),
    description: t(["wording", "menu", "achievements"]),
    image: getGeneral("achievement", "00010000"),
    type: Link,
  },
  {
    name: "legacyWebsite",
    href: "https://puchi-legacy.loveliv.es/",
    translated: t(["wording", "menu", "legacyWebsite"]),
    description: t(["wording", "menu", "legacyWebsite"]),
    image: getGeneral("achievement", "00010000"),
    type: "a",
  },
];
