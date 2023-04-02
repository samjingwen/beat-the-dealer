import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { isVisible } from "@testing-library/user-event/dist/utils";

export default function Score({
  messageText,
  wrongCount,
}: {
  messageText: string;
  wrongCount: number;
}) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <Button
        sx={{ width: "90px" }}
        variant="outlined"
        onClick={() => setIsVisible((prevState) => !prevState)}
      >
        {isVisible ? 'Hide' : 'Show'}
      </Button>
      <Typography sx={{ display: isVisible ? "block" : "none" }} variant="h6">
        {messageText}
      </Typography>
      <Typography sx={{ display: isVisible ? "block" : "none" }} variant="h6">
        {wrongCount}
      </Typography>
      <Typography sx={{ display: isVisible ? "block" : "none" }} variant="h6">
        Dealer wins:{" "}
      </Typography>
      <Typography sx={{ display: isVisible ? "block" : "none" }} variant="h6">
        Player wins:{" "}
      </Typography>
    </div>
  );
}
