export default function Card({ name, url }) {
  return (
    <div className={name}>
      <img src={url} alt={name} />
      <p>{name}</p>
    </div>
  );
}
