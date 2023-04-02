import React from "react";
import { Box, Grid } from "@mui/material";
import CardList from "../card/CardList";
import { DealerHandInfo } from "../card/DealerHandInfo";

export default function Dealer({
  hand,
  dealerDraw,
}: {
  hand: DealerHandInfo;
  dealerDraw: (numOfCards: number) => void;
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
      </Grid>
    </Box>
  );
}
