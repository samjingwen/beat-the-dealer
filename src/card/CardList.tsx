import Card from "./Card";
import React from "react";
import CardInfo from "./CardInfo";
import { Box } from "@mui/material";

export default function CardList({ cards }: { cards: CardInfo[] }) {
  return (
    <Box>
      {cards.map((card) => (
        <Card key={card.suit + "_" + card.rank} cardInfo={card}></Card>
      ))}
    </Box>
  );
}
