import { HandInfo } from "./HandInfo";
import CardInfo from "./CardInfo";

export class DealerHandInfo extends HandInfo {
  constructor(cards: CardInfo[]) {
    super(cards);
    for (let i = 1; i < cards.length; i++) {
      cards[i].hidden = true;
    }
  }

  public get upCard(): CardInfo {
    return this.cards[0];
  }
}
