import { HandType } from "../card/HandType";
import CardInfo from "../card/CardInfo";
import { BasicStrategyAction } from "./BasicStrategyAction";
import { Rank } from "../card/Rank";
import { PlayerHandInfo } from "../card/PlayerHandInfo";

export default class BasicStrategy {
  static get(player: PlayerHandInfo, dealer: CardInfo): BasicStrategyAction {
    // Split
    if (player.canSplit()) {
      if (
        player.cards[0].rank === Rank.ACE ||
        player.cards[0].rank === Rank.EIGHT
      ) {
        return BasicStrategyAction.SPLIT;
      } else if (
        player.cards[0].rank === Rank.TWO ||
        player.cards[0].rank === Rank.THREE ||
        player.cards[0].rank === Rank.SIX
      ) {
        switch (dealer.rank) {
          case Rank.TWO:
          case Rank.THREE:
          case Rank.FOUR:
          case Rank.FIVE:
          case Rank.SIX:
          case Rank.SEVEN:
            return BasicStrategyAction.SPLIT;
        }
      } else if (player.cards[0].rank === Rank.SEVEN) {
        switch (dealer.rank) {
          case Rank.TWO:
          case Rank.THREE:
          case Rank.FOUR:
          case Rank.FIVE:
          case Rank.SIX:
          case Rank.SEVEN:
          case Rank.EIGHT:
            return BasicStrategyAction.SPLIT;
        }
      } else if (player.cards[0].rank === Rank.NINE) {
        switch (dealer.rank) {
          case Rank.TWO:
          case Rank.THREE:
          case Rank.FOUR:
          case Rank.FIVE:
          case Rank.SIX:
          case Rank.EIGHT:
          case Rank.NINE:
            return BasicStrategyAction.SPLIT;
        }
      } else if (player.cards[0].rank === Rank.FOUR) {
        if (dealer.rank === Rank.FIVE) {
          return BasicStrategyAction.SPLIT;
        }
      }
    }

    // Double
    if (player.cards.length === 2) {
      // hard
      if (player.type === HandType.HARD) {
        if (player.value === 11) {
          return BasicStrategyAction.DOUBLE;
        } else if (player.value === 10) {
          switch (dealer.rank) {
            case Rank.TWO:
            case Rank.THREE:
            case Rank.FOUR:
            case Rank.FIVE:
            case Rank.SIX:
            case Rank.SEVEN:
            case Rank.EIGHT:
            case Rank.NINE:
              return BasicStrategyAction.DOUBLE;
          }
        } else if (player.value === 9) {
          switch (dealer.rank) {
            case Rank.TWO:
            case Rank.THREE:
            case Rank.FOUR:
            case Rank.FIVE:
            case Rank.SIX:
              return BasicStrategyAction.DOUBLE;
          }
        } else if (player.value === 8) {
          switch (dealer.rank) {
            case Rank.FIVE:
            case Rank.SIX:
              if (
                player.cards[0].rank !== Rank.SIX &&
                player.cards[0].rank !== Rank.TWO
              )
                return BasicStrategyAction.DOUBLE;
          }
        }
        // soft
      } else {
        if (player.value === 18) {
          switch (dealer.rank) {
            case Rank.THREE:
            case Rank.FOUR:
            case Rank.FIVE:
            case Rank.SIX:
              return BasicStrategyAction.DOUBLE;
          }
        } else if (player.value === 17) {
          switch (dealer.rank) {
            case Rank.TWO:
            case Rank.THREE:
            case Rank.FOUR:
            case Rank.FIVE:
            case Rank.SIX:
              return BasicStrategyAction.DOUBLE;
          }
        } else if (
          player.value === 16 ||
          player.value === 15 ||
          player.value === 14 ||
          player.value === 13
        ) {
          switch (dealer.rank) {
            case Rank.FOUR:
            case Rank.FIVE:
            case Rank.SIX:
              return BasicStrategyAction.DOUBLE;
          }
        }
      }
    }

    // Stand or Draw
    if (player.type === HandType.HARD) {
      if (dealer.rank === Rank.TWO || dealer.rank === Rank.THREE) {
        return player.value >= 13
          ? BasicStrategyAction.STAND
          : BasicStrategyAction.DRAW;
      } else if (
        dealer.rank === Rank.FOUR ||
        dealer.rank === Rank.FIVE ||
        dealer.rank === Rank.SIX
      ) {
        return player.value >= 12
          ? BasicStrategyAction.STAND
          : BasicStrategyAction.DRAW;
      } else if (
        dealer.rank === Rank.TEN ||
        dealer.rank === Rank.JACK ||
        dealer.rank === Rank.QUEEN ||
        dealer.rank === Rank.KING
      ) {
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
        return player.value >= 17
          ? BasicStrategyAction.STAND
          : BasicStrategyAction.DRAW;
      } else if (
        dealer.rank === Rank.SEVEN ||
        dealer.rank === Rank.EIGHT ||
        dealer.rank === Rank.NINE ||
        dealer.rank === Rank.ACE
      ) {
        return player.value >= 17
          ? BasicStrategyAction.STAND
          : BasicStrategyAction.DRAW;
      }
      throw new Error("Did not expect to be here");
    } else {
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
