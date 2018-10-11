import {Image} from "semantic-ui-react";
import {getSPRImage} from "../services/xet";
import React from "react";
import {chunkArray} from "./utils";
import Link from "umi/link";

export function parseEffect(row) {
  if (!row) return null;
  const effect = JSON.parse(row.eventEffect);
  row.effect10 = effect.filter(x => (x.effect === 10));
  row.effect20 = effect.filter(x => (x.effect === 20));
  row.effect40 = effect.filter(x => (x.effect === 40));
  row.effect = effect;
  return row;
}


export function parseEffectNesos(r_) {
  const r = JSON.parse(JSON.stringify(r_));
  const chunk = chunkArray(r, 3);
  return (
   <div>
     {
       chunk.map(c =>
         <div key={JSON.stringify(c)}>
           {
             c.map(x => (
               <Link
                 to={`/nesos/${x.memberId}`}
                 key={x.memberId}
               >
                 <Image
                   src={getSPRImage(x.memberId)}
                   size="mini"
                   style={{display: "inline"}}
                 />
               </Link>
             ))
           }
         </div>
       )
     }
   </div>
  );
}
