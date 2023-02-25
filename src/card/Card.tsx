import React from "react";
import CardInfo from "./CardInfo";

export default function Card({ cardInfo }: { cardInfo: CardInfo }) {
  const imgUrl =
    "/images/cards/" +
    (cardInfo.hidden ? "BACK" : cardInfo.rank + "-" + cardInfo.suit) +
    ".png";

  return (
    <React.Fragment>
      <img style={{ height: "200px" }} src={imgUrl} />
    </React.Fragment>
  );
}
