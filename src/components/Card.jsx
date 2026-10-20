export default function Card({ name, url, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={url} alt={name} />
      <p>{name}</p>
    </div>
  );
}
