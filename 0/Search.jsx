import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function RecipeSearch() {
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
          userId: session.user.email,
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

  const DeleteFavorite = async (recipe) => {
    console.log(session);
    console.log(session.user.email);
    try {
      const response = await fetch("/api/Favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.email,
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
      <button onClick={handleSearch}>Discover</button>

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} />
          <button onClick={() => AddFavorite(recipe)}>I Luxe it!</button>
        </div>
      ))}
    </div>
  );
}

// [
//   {
//     dayOfWeek: "Sunday",
//     meals: [
//       {
//         mealType: "breakfast",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "lunch",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "dinner",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "snack",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//     ],
//   },
//   {
//     dayOfWeek: "Monday",
//     meals: [
//       {
//         mealType: "breakfast",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "lunch",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "dinner",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "snack",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//     ],
//   },
//   {
//     dayOfWeek: "Tuesday",
//     meals: [
//       {
//         mealType: "breakfast",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "lunch",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "dinner",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "snack",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//     ],
//   },
//   {
//     dayOfWeek: "Wednesday",
//     meals: [
//       {
//         mealType: "breakfast",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "lunch",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "dinner",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "snack",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//     ],
//   },
//   {
//     dayOfWeek: "Thursday",
//     meals: [
//       {
//         mealType: "breakfast",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "lunch",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "dinner",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "snack",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//     ],
//   },
//   {
//     dayOfWeek: "Friday",
//     meals: [
//       {
//         mealType: "breakfast",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "lunch",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "dinner",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "snack",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//     ],
//   },
//   {
//     dayOfWeek: "Saturday",
//     meals: [
//       {
//         mealType: "breakfast",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "lunch",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "dinner",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//       {
//         mealType: "snack",
//         recipeId: "string",
//         recipeName: "string",
//         recipeDescription: "string",
//       },
//     ],
//   },
// ];
