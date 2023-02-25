import CardInfo from "../card/CardInfo";

export default interface BoardInfo {
    numOfDeck: number;
    shoe: CardInfo[];
    dealer: CardInfo[];
    player: CardInfo[];
}