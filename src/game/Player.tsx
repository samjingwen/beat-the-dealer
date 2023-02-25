import { Box, Button, Grid } from "@mui/material";
import CardList from "../card/CardList";
import React from "react";
import CardInfo from "../card/CardInfo";

export default function Player({
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
        <Grid>
          <Button variant="outlined" onClick={() => handleDrawBtnClick(1)}>
            Draw
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
