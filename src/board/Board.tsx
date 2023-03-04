import CardInfo from "../card/CardInfo";
import React, { useEffect, useState } from "react";
import Dealer from "../game/Dealer";
import BoardInfo from "../game/BoardInfo";
import Player from "../game/Player";
import { Typography } from "@mui/material";
import { Suit } from "../card/Suit";
import { Rank } from "../card/Rank";
import BasicStrategy from "../strategy/BasicStrategy";
import { HandInfo } from "../card/HandInfo";
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
  });

  const [messageText, setMessageText] = useState<string>("");

  useEffect(() => {
    resetBoard();
  }, []);

  function dealerDraw() {}

  function playerDraw(id: number, numOfCards: number) {
    let cardInfos = boardInfo.shoe.deal(numOfCards);
    boardInfo.playerHands[id].draw(cardInfos);

    let result = BasicStrategy.get(
      boardInfo.playerHands[id],
      boardInfo.dealerHand.upCard
    );
    setMessageText(result === BasicStrategyAction.DRAW ? "Correct!" : "Wrong!");
    if (result === BasicStrategyAction.STAND) {
      return;
    }

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
    setMessageText(
      result === BasicStrategyAction.STAND ? "Correct!" : "Wrong!"
    );
  }

  function playerDouble() {}

  function playerSplit() {}

  function resetBoard() {
    const cards = initDecks(1);

    const playerHand = new PlayerHandInfo([...cards.slice(-2)]);
    const dealerHand = new DealerHandInfo([...cards.slice(-4, -2)]);
    const shoe = new ShoeInfo([...cards.slice(0, -4)]);

    setBoardInfo({
      numOfDeck: 1,
      shoe: shoe,
      dealerHand: dealerHand,
      playerHands: [playerHand],
    });

    setMessageText("");
  }

  return (
    <React.Fragment>
      <Dealer hand={boardInfo.dealerHand} dealerDraw={dealerDraw} />
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

      <Typography variant="h6">{messageText}</Typography>
      <Score />
    </React.Fragment>
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

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex],
      cards[currentIndex],
    ];
  }

  return cards;
}
