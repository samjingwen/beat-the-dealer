import CardInfo from "./CardInfo";
import { CardValue } from "./CardValue";

export class ShoeInfo {
  private _cards: CardInfo[];

  constructor(cards: CardInfo[]) {
    this._cards = cards;
  }

  public get cards(): CardInfo[] {
    return this._cards;
  }

  public deal(numOfCards: number): CardInfo[] {
    if (numOfCards > this._cards.length) {
      throw new Error("Cannot deal more cards than left in shoe");
    }

    const result = [...this._cards.slice(-numOfCards)];
    this._cards = [...this._cards.slice(0, -numOfCards)];
    return result;
  }
}
