import { HandType } from "./HandType";
import CardInfo from "./CardInfo";
import { Rank } from "./Rank";
import { CardValue } from "./CardValue";

export class HandInfo {
  readonly cards: CardInfo[];
  readonly value: number;
  readonly type: HandType;

  static newInstance(cards: CardInfo[]) {
    let result = 0;
    let aces = 0;
    let type = HandType.HARD;
    cards.forEach((card) => {
      result += this.values[card.rank];
      aces += card.rank === Rank.ACE ? 1 : 0;
    });
    while (result <= 11 && aces > 0) {
      result += 10;
      aces--;
      type = HandType.SOFT;
    }
    return new HandInfo(cards, result, type);
  }

  constructor(cards: CardInfo[], value: number, type: HandType) {
    this.cards = cards;
    this.value = value;
    this.type = type;
  }

  private static values: Record<Rank, CardValue> = {
    [Rank.TWO]: CardValue.TWO,
    [Rank.THREE]: CardValue.THREE,
    [Rank.FOUR]: CardValue.FOUR,
    [Rank.FIVE]: CardValue.FIVE,
    [Rank.SIX]: CardValue.SIX,
    [Rank.SEVEN]: CardValue.SEVEN,
    [Rank.EIGHT]: CardValue.EIGHT,
    [Rank.NINE]: CardValue.NINE,
    [Rank.TEN]: CardValue.TEN,
    [Rank.JACK]: CardValue.TEN,
    [Rank.QUEEN]: CardValue.TEN,
    [Rank.KING]: CardValue.TEN,
    [Rank.ACE]: CardValue.ACE,
  };
}
