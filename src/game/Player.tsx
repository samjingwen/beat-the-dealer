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
  playerDouble: (id: number) => void;
  playerSplit: (id: number) => void;
  resetBoard: () => void;
}) {
  return (
    <Box
      component="div"
      sx={{
        p: 2,
        border: "1px dashed grey",
        width: "300px",
        height: "200px",
        margin: "auto",
      }}
    >
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <CardList cards={hand.cards} />
        </Grid>

        <Grid>
          <Grid item xs={12} sx={{ display: "inline-flex", margin: "auto" }}>
            <Grid item>
              <Button
                sx={{ width: "90px" }}
                variant="outlined"
                onClick={(event) => playerDraw(playerId, 1)}
              >
                Draw
              </Button>
            </Grid>

            <Grid item>
              <Button
                sx={{ width: "90px" }}
                variant="outlined"
                onClick={() => playerStand(playerId)}
              >
                Stand
              </Button>
            </Grid>
          </Grid>

          <Grid>
            <Grid item>
              <Button
                sx={{ width: "90px" }}
                variant="outlined"
                onClick={() => playerDouble(playerId)}
              >
                Double
              </Button>
            </Grid>

            <Grid item>
              <Button
                sx={{ width: "90px" }}
                variant="outlined"
                onClick={() => playerSplit(playerId)}
                disabled={!hand.canSplit()}
              >
                Split
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
