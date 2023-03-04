import { HandType } from "./HandType";
import CardInfo from "./CardInfo";
import { Rank } from "./Rank";
import { CardValue } from "./CardValue";

export class HandInfo {
  private readonly _cards: CardInfo[];

  constructor(cards: CardInfo[]) {
    this._cards = cards;
  }

  public get cards(): CardInfo[] {
    return this._cards;
  }

  public get value(): number {
    let result = 0;
    let aces = 0;
    this._cards.forEach((card) => {
      result += HandInfo.values[card.rank];
      aces += card.rank === Rank.ACE ? 1 : 0;
    });
    while (result <= 11 && aces > 0) {
      result += 10;
      aces--;
    }
    return result;
  }

  get type(): HandType {
    let result = 0;
    let aces = 0;
    this._cards.forEach((card) => {
      result += HandInfo.values[card.rank];
      aces += card.rank === Rank.ACE ? 1 : 0;
    });
    if (result <= 11 && aces > 0) {
      return HandType.SOFT;
    }
    return HandType.HARD;
  }

  public draw(cards: CardInfo[]) {
    this._cards.push(...cards);
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
