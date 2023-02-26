import { HandInfo } from "../card/HandInfo";
import { HandType } from "../card/HandType";
import CardInfo from "../card/CardInfo";
import { BasicStrategyAction } from "./BasicStrategyAction";
import { Rank } from "../card/Rank";

export default class BasicStrategy {
  static get(player: HandInfo, dealer: CardInfo): BasicStrategyAction {
    switch (player.type) {
      case HandType.HARD:
        switch (dealer.rank) {
          case Rank.TWO:
          case Rank.THREE:
            return player.value >= 13
              ? BasicStrategyAction.STAND
              : BasicStrategyAction.DRAW;
          case Rank.FOUR:
          case Rank.FIVE:
          case Rank.SIX:
            return player.value >= 12
              ? BasicStrategyAction.STAND
              : BasicStrategyAction.DRAW;
          case Rank.TEN:
          case Rank.JACK:
          case Rank.QUEEN:
          // @ts-ignore
          case Rank.KING:
            if (player.value === 16) {
              return player.cards.length === 2
                ? BasicStrategyAction.DRAW
                : BasicStrategyAction.STAND;
            }
            if (
              player.cards.length === 2 &&
              player.cards[0].rank === Rank.SEVEN &&
              player.cards[1].rank === Rank.SEVEN
            ) {
              return BasicStrategyAction.STAND;
            }
          case Rank.SEVEN:
          case Rank.EIGHT:
          case Rank.NINE:
          case Rank.ACE:
            return player.value >= 17
              ? BasicStrategyAction.STAND
              : BasicStrategyAction.DRAW;
        }
        throw new Error("Did not expect to be here");
      case HandType.SOFT:
        switch (dealer.rank) {
          case Rank.TWO:
          case Rank.THREE:
          case Rank.FOUR:
          case Rank.FIVE:
          case Rank.SIX:
          case Rank.SEVEN:
          case Rank.EIGHT:
          case Rank.ACE:
            return player.value >= 18
              ? BasicStrategyAction.STAND
              : BasicStrategyAction.DRAW;
          case Rank.NINE:
          case Rank.TEN:
          case Rank.JACK:
          case Rank.QUEEN:
          case Rank.KING:
            return player.value >= 19
              ? BasicStrategyAction.STAND
              : BasicStrategyAction.DRAW;
        }
        throw new Error("Did not expect to be here");
    }
  }
}
