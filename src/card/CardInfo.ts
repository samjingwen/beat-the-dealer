import {Suit} from "./Suit";
import {Rank} from "./Rank";

export default interface CardInfo {
    suit: Suit
    rank: Rank
    hidden: boolean
}
