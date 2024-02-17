import Image from "next/image";

export default function MealCard({ id, title, image }) {
  return (
    <div key={id}>
      <h3>{title}</h3>
      <Image src={image} alt={title} />
      <button onClick={() => handleSaveFavorite({ id, title, image })}>
        Save to Favorites
      </button>
    </div>
  );
}
