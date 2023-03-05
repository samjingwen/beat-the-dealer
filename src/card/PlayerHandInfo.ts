import { HandInfo } from "./HandInfo";

export class PlayerHandInfo extends HandInfo {
  public canSplit(): boolean {
    return this.cards.length === 2 && this.cards[0].rank === this.cards[1].rank;
  }

  public split(): PlayerHandInfo[] {
    if (this.canSplit()) {
      return [
        new PlayerHandInfo([this.cards[0]]),
        new PlayerHandInfo([this.cards[1]]),
      ];
    }
    throw new Error("Hand cannot be split");
  }
}
