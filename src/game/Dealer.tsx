import Card from "../card/Card";
import React, { useEffect, useState } from "react";
import CardInfo from "../card/CardInfo";
import { Box, Button, Grid } from "@mui/material";
import CardList from "../card/CardList";

export default function Dealer({
  cards,
  addCards,
}: {
  cards: CardInfo[];
  addCards: (numOfCards: number) => void;
}) {
  function handleDrawBtnClick(numOfCards: number) {
    addCards(numOfCards);
  }

  return (
    <Box component="div">
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12} sx={{ height: "200px" }}>
          <CardList cards={cards} />
        </Grid>
      </Grid>
    </Box>
  );
}
