import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { RiVipCrown2Fill } from "react-icons/ri";

export default function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const { data: session } = useSession();

  const searchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const AddFavorite = async (recipe) => {
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
    <div className="flex justify-center items-center">
      <div className="max-w-screen-lg w-full px-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-96 p-2 border border-black rounded"
          placeholder="Search for recipes..."
        />
        <button
          onClick={searchRecipes}
          className="mt-2 px-4 py-2 bg-zinc text-white rounded hover:bg-zinc-700"
        >
          Search
        </button>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="relative flex flex-col items-center"
            >
              {/* recipe.id seems to be causing 404 error, but is needed to pull specific query from API */}
              <Link href={`/Discover/Recipe/${recipe.id}`}>
                <div className="relative w-64 h-64 rounded-lg">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={300}
                    height={300 * (4 / 3)}
                    className="rounded-lg"
                  />
                  <RiVipCrown2Fill
                    className="absolute top-5 right-5 text-zinc-500 hover:text-white"
                    size={30}
                  />
                </div>
              </Link>
              <h3 className="font-bold">{recipe.title}</h3>
              <button
                onClick={() => AddFavorite(recipe)}
                className="mt-2 px-4 py-2 bg-zinc text-white rounded hover:bg-zinc-700"
              >
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
