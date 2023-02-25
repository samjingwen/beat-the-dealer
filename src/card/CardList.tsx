import { Grid } from "@mui/material";
import Card from "./Card";
import React from "react";
import CardInfo from "./CardInfo";

export default function CardList({ cards }: { cards: CardInfo[] }) {
  return (
    <React.Fragment>
      {cards.map((card) => (
        <Card key={card.suit + "_" + card.rank} cardInfo={card}></Card>
      ))}
    </React.Fragment>
  );
}
