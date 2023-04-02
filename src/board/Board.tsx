import CardInfo from "../card/CardInfo";
import React, { useEffect, useState } from "react";
import Dealer from "../game/Dealer";
import BoardInfo from "../game/BoardInfo";
import Player from "../game/Player";
import { Box, Grid, Typography } from "@mui/material";
import { Suit } from "../card/Suit";
import { Rank } from "../card/Rank";
import BasicStrategy from "../strategy/BasicStrategy";
import { BasicStrategyAction } from "../strategy/BasicStrategyAction";
import Score from "../score/Score";
import { ShoeInfo } from "../card/ShoeInfo";
import { DealerHandInfo } from "../card/DealerHandInfo";
import { PlayerHandInfo } from "../card/PlayerHandInfo";

export default function Board() {
  const [boardInfo, setBoardInfo] = useState<BoardInfo>({
    numOfDeck: 0,
    shoe: new ShoeInfo([]),
    dealerHand: new DealerHandInfo([]),
    playerHands: [] as PlayerHandInfo[],
    hasPlayerStand: [] as boolean[],
  });
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [messageText, setMessageText] = useState<string>("");

  useEffect(() => {
    resetBoard();
  }, []);

  function dealerDraw() {}

  function playerDraw(id: number, numOfCards: number) {
    let result = BasicStrategy.get(
      boardInfo.playerHands[id],
      boardInfo.dealerHand.upCard
    );
    if (result !== BasicStrategyAction.DRAW) {
      setMessageText("Wrong! Should " + result.toString());
      setWrongCount((prevState) => prevState + 1);
      return;
    }
    setMessageText("Correct!");

    let cardInfos = boardInfo.shoe.deal(numOfCards);
    boardInfo.playerHands[id].draw(cardInfos);

    setBoardInfo((prevState) => {
      return {
        ...prevState,
        shoe: boardInfo.shoe,
        playerHands: boardInfo.playerHands,
      };
    });
  }

  function playerStand(id: number) {
    let result = BasicStrategy.get(
      boardInfo.playerHands[id],
      boardInfo.dealerHand.upCard
    );
    if (result !== BasicStrategyAction.STAND) {
      setMessageText("Wrong! Should " + result);
      setWrongCount((prevState) => prevState + 1);
      return;
    }
    setMessageText("Correct!");
    setBoardInfo((prevState) => {
      prevState.dealerHand.showHidden();
      prevState.dealerHand.drawTo17(prevState.shoe);
      return {
        ...prevState,
        shoe: prevState.shoe,
        dealerHand: prevState.dealerHand,
      };
    });
  }

  function playerDouble(id: number) {
    let result = BasicStrategy.get(
      boardInfo.playerHands[id],
      boardInfo.dealerHand.upCard
    );
    if (result !== BasicStrategyAction.DOUBLE) {
      setMessageText("Wrong! Should " + result);
      setWrongCount((prevState) => prevState + 1);
      return;
    }
    setMessageText("Correct!");

    let cardInfos = boardInfo.shoe.deal(1);
    boardInfo.playerHands[id].draw(cardInfos);

    setBoardInfo((prevState) => {
      return {
        ...prevState,
        shoe: boardInfo.shoe,
        playerHands: boardInfo.playerHands,
      };
    });
  }

  function playerSplit(id: number) {
    let result = BasicStrategy.get(
      boardInfo.playerHands[id],
      boardInfo.dealerHand.upCard
    );
    if (result !== BasicStrategyAction.SPLIT) {
      setMessageText("Wrong! Should " + result);
      setWrongCount((prevState) => prevState + 1);
      return;
    }
    setMessageText("Correct!");

    setBoardInfo((prevState) => {
      let hands = prevState.playerHands[id].split();

      let newCards = prevState.shoe.deal(2);
      hands[0].draw([newCards[0]]);
      hands[1].draw([newCards[1]]);

      return {
        ...prevState,
        shoe: boardInfo.shoe,
        playerHands: [
          ...prevState.playerHands.slice(0, id),
          hands[0],
          hands[1],
          ...prevState.playerHands.slice(id + 1),
        ],
      };
    });
  }

  function resetBoard() {
    const cards = initDecks(1);
    const playerNumOfHands = 1;

    let dealerHandInfo = new DealerHandInfo([
      ...cards.slice(
        cards.length - 2 - playerNumOfHands * 2,
        cards.length - playerNumOfHands * 2
      ),
    ]);

    const playerHands = [] as PlayerHandInfo[];
    const hasPlayerStand = [] as boolean[];
    for (let i = 0; i < playerNumOfHands; i++) {
      playerHands.push(
        new PlayerHandInfo([
          ...cards.slice(cards.length - 2 - i * 2, cards.length - i * 2),
        ])
      );

      hasPlayerStand.push(false);
    }

    setBoardInfo({
      numOfDeck: 1,
      shoe: new ShoeInfo([
        ...cards.slice(0, cards.length - playerNumOfHands * 3),
      ]),
      dealerHand: dealerHandInfo,
      playerHands: playerHands,
      hasPlayerStand: hasPlayerStand,
    });

    setMessageText("");
  }

  return (
    <Box>
      <Dealer hand={boardInfo.dealerHand} dealerDraw={dealerDraw} />
      <Grid container sx={{ display: "inline-flex" }}>
        <Grid sx={{ flexGrow: 1 }}></Grid>
        {boardInfo.playerHands.map((hand, index) => (
          <Player
            key={index}
            hand={hand}
            playerId={index}
            playerDraw={playerDraw}
            playerStand={playerStand}
            playerDouble={playerDouble}
            playerSplit={playerSplit}
            resetBoard={resetBoard}
          />
        ))}
        <Grid sx={{ flexGrow: 1 }}></Grid>
      </Grid>
      <Score messageText={messageText} wrongCount={wrongCount} />
    </Box>
  );
}

function initDecks(numOfDeck: number): CardInfo[] {
  let result: CardInfo[] = [];
  for (let i = 0; i < numOfDeck; i++) {
    result.push(...initSingleDeck());
  }
  return shuffle(result);
}

function initSingleDeck(): CardInfo[] {
  return Object.values(Suit).flatMap((suit) =>
    Object.values(Rank).map((rank) => ({ suit, rank, hidden: false }))
  );
}

function shuffle(cards: CardInfo[]): CardInfo[] {
  let currentIndex = cards.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex],
      cards[currentIndex],
    ];
  }

  return cards;
}
