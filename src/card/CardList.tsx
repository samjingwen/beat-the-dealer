import Card from "./Card";
import React from "react";
import CardInfo from "./CardInfo";
import { Box } from "@mui/material";

export default function CardList({ cards }: { cards: CardInfo[] }) {
  return (
    <Box component="div">
      {cards.map((card, index) => (
        <Box
          key={card.suit + "_" + card.rank}
          component="span"
          sx={{
            // right: `calc(${index} * 75px)`,
            position: "absolute",
            // display: "inline-block",
            overflow: "hidden",
            margin: 0,
            height: "150px",
          }}
        >
          <Card key={card.suit + "_" + card.rank} cardInfo={card}></Card>
        </Box>
      ))}
    </Box>
  );
}
