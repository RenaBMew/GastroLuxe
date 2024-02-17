import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { data: session } = useSession();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&instructionsRequired=true&number=5&apiKey=da8821d24b1f4f9784c73edfc69a30ed`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (recipe) => {
    console.log(session);
    try {
      const res = await fetch("/api/Favorites/Add", {
        method: "POST",
        body: JSON.stringify({
          userId: session.user.email,
          ...recipe,
          "Content-Type": "application/json",
        }),
      });
      console.log(recipe);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const response = await res.json();
      console.log(response.message);
      setFavorites([...favorites, recipe]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} />
          <button onClick={() => handleSubmit(recipe)}>Add to Favorites</button>
        </div>
      ))}
    </div>
  );
}
