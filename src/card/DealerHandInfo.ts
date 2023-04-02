import { HandInfo } from "./HandInfo";
import CardInfo from "./CardInfo";
import { ShoeInfo } from "./ShoeInfo";

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

  public drawTo17(shoe: ShoeInfo) {
    while (this.value < 17) {
      let cards = shoe.deal(1);
      this.draw(cards);
    }
  }

  public showHidden() {
    this.cards[1].hidden = false;
  }
}
