"use client";
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

  const AddFavorite = async (recipe) => {
    console.log(session.user.email);
    try {
      const response = await fetch("/api/Favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          ...recipe,
        }),
      });
      console.log(recipe);

      if (response.ok) {
        console.log("Recipe added to favorites!");
      } else {
        console.error("Error adding to favorites:", await response.json());
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
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
          <button onClick={() => AddFavorite(recipe)}>Add to Favorites</button>
        </div>
      ))}
    </div>
  );
}
