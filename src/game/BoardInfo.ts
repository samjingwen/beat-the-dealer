import CardInfo from "../card/CardInfo";
import {HandInfo} from "../card/HandInfo";
import {ShoeInfo} from "../card/ShoeInfo";
import {DealerHandInfo} from "../card/DealerHandInfo";
import {PlayerHandInfo} from "../card/PlayerHandInfo";

export default interface BoardInfo {
    numOfDeck: number;
    shoe: ShoeInfo;
    dealerHand: DealerHandInfo;
    playerHands: PlayerHandInfo[];
}