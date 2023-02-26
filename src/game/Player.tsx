import { Box, Button, Grid } from "@mui/material";
import CardList from "../card/CardList";
import React from "react";
import CardInfo from "../card/CardInfo";

export default function Player({
  cards,
  playerDraw,
  playerStand,
  resetBoard,
}: {
  cards: CardInfo[];
  playerDraw: (numOfCards: number) => void;
  playerStand: () => void;
  resetBoard: () => void;
}) {
  return (
    <Box component="div">
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12} sx={{ height: "200px" }}>
          <CardList cards={cards} />
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={() => playerDraw(1)}>
            Draw
          </Button>
          <Button variant="outlined" onClick={() => playerStand()}>
            Stand
          </Button>
          <Button variant="outlined" onClick={() => resetBoard()}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
