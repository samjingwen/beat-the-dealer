import { Box, Button, Grid } from "@mui/material";
import CardList from "../card/CardList";
import React from "react";
import { PlayerHandInfo } from "../card/PlayerHandInfo";

export default function Player({
  hand,
  playerId,
  playerDraw,
  playerStand,
  playerDouble,
  playerSplit,
  resetBoard,
}: {
  hand: PlayerHandInfo;
  playerId: number;
  playerDraw: (id: number, numOfCards: number) => void;
  playerStand: (id: number) => void;
  playerDouble: () => void;
  playerSplit: () => void;
  resetBoard: () => void;
}) {
  return (
    <Box component="div" sx={{ p: 2, border: "1px dashed grey" }}>
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12} sx={{ height: "200px" }}>
          <CardList cards={hand.cards} />
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            onClick={(event) => playerDraw(playerId, 1)}
          >
            Draw
          </Button>
          <Button variant="outlined" onClick={() => playerStand(playerId)}>
            Stand
          </Button>
          <Button variant="outlined" onClick={() => playerDouble()}>
            Double
          </Button>
          <Button variant="outlined" onClick={() => playerSplit()}>
            Split
          </Button>
          <Button variant="outlined" onClick={() => resetBoard()}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
