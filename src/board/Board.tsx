import Card from "../card/Card";

const suits = ["C", "D", "H", "S"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export default function Board() {
  return (
    <div>
      {suits.map((suit) =>
        ranks.map((rank) => <Card suit={suit} rank={rank} />)
      )}
    </div>
  );
}
