import Card from "../card/Card";
import CardInfo from "../card/CardInfo";
import React, { useEffect, useState } from "react";
import Dealer from "../game/Dealer";
import BoardInfo from "../game/BoardInfo";
import Player from "../game/Player";

export default function Board() {
  const [boardInfo, setBoardInfo] = useState<BoardInfo>({
    numOfDeck: 0,
    shoe: [],
    dealer: [],
    player: [],
  });

  function addPlayerCards(numOfCards: number) {
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

  useEffect(() => {
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
  }, []);

  return (
    <React.Fragment>
      <Dealer cards={boardInfo.dealer} addCards={addDealerCards} />
      <Player cards={boardInfo.player} addCards={addPlayerCards} />
    </React.Fragment>
  );
}

const suits: string[] = ["C", "D", "H", "S"];
const ranks: string[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

function initDecks(numOfDeck: number): CardInfo[] {
  let result: CardInfo[] = [];
  for (let i = 0; i < numOfDeck; i++) {
    result.push(...initSingleDeck());
  }
  return shuffle(result);
}

function initSingleDeck(): CardInfo[] {
  return suits.flatMap((suit) =>
    ranks.map((rank) => ({ suit, rank, hidden: false }))
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
