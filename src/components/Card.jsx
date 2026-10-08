export default function Card({ name, url, onClick }) {
  return (
    <div className={name} onClick={onClick}>
      <img src={url} alt={name} />
      <p>{name}</p>
    </div>
  );
}
