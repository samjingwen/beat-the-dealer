import Card from "../card/Card";
import React, { useEffect, useState } from "react";
import CardInfo from "../card/CardInfo";
import { Box, Button, Grid } from "@mui/material";
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
    <Box component="div" sx={{ p: 2, border: "1px dashed grey" }}>
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12} sx={{ height: "200px" }}>
          <CardList cards={hand.cards} />
        </Grid>
      </Grid>
    </Box>
  );
}
