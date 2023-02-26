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

export default function Board() {
  const [boardInfo, setBoardInfo] = useState<BoardInfo>({
    numOfDeck: 0,
    shoe: [],
    dealer: [],
    player: [],
  });

  const [messageText, setMessageText] = useState<string>("");

  useEffect(() => {
    resetBoard();
  }, []);

  function playerDraw(numOfCards: number) {
    const playerInfo = HandInfo.newInstance([...boardInfo.player]);
    let result = BasicStrategy.get(playerInfo, boardInfo.dealer[0]);
    setMessageText(result === BasicStrategyAction.DRAW ? "Correct!" : "Wrong!");
    if (result === BasicStrategyAction.STAND) {
      return;
    }

    setBoardInfo((prevState) => {
      return {
        ...prevState,
        shoe: [...prevState.shoe.slice(0, -numOfCards)],
        player: [...prevState.player, ...prevState.shoe.slice(-numOfCards)],
      };
    });
  }

  function addDealerCards(numOfCards: number) {
    setBoardInfo((prevState) => {
      return {
        ...prevState,
        shoe: [...prevState.shoe.slice(0, -numOfCards)],
        dealer: [...prevState.dealer, ...prevState.shoe.slice(-numOfCards)],
      };
    });
  }

  function playerStand() {
    const playerInfo = HandInfo.newInstance([...boardInfo.player]);
    let result = BasicStrategy.get(playerInfo, boardInfo.dealer[0]);
    setMessageText(
      result === BasicStrategyAction.STAND ? "Correct!" : "Wrong!"
    );
  }

  function resetBoard() {
    const cards = initDecks(1);

    const playerCards = [...cards.slice(-2)];
    const dealerCards = [...cards.slice(-4, -2)];
    dealerCards[1].hidden = true;
    const shoe = [...cards.slice(0, -4)];

    setBoardInfo({
      numOfDeck: 1,
      shoe: shoe,
      dealer: dealerCards,
      player: playerCards,
    });

    setMessageText("");
  }

  return (
    <React.Fragment>
      <Dealer cards={boardInfo.dealer} addCards={addDealerCards} />
      <Player
        cards={boardInfo.player}
        playerDraw={playerDraw}
        playerStand={playerStand}
        resetBoard={resetBoard}
      />
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
