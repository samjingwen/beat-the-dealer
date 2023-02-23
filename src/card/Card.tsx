export default function Card(props: { suit: string; rank: string }) {
  const { suit, rank } = props;

  const imgUrl = "/images/cards/" + rank + "-" + suit + ".png";

  return (
    <div>
      <img src={imgUrl} />
    </div>
  );
}
