import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { RiVipCrown2Fill } from "react-icons/ri";

export default function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const { data: session } = useSession();
  const [apiLimitReached, setApiLimitReached] = useState(false);
  // TODO: logic to filter out current favorites or indicate meal is favorited via icon
  const searchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      //Message is limit is reached.
      if (data.status === "failure") {
        setApiLimitReached(true);
      } else {
        setRecipes(data.results);
      }
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
    <section id="Recipe Search" className="text-center">
      <h1>Search for a Recipe</h1>
      <p>Search for something yummy and add it to your LuxeBook!</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-96 p-2 border border-black rounded mt-10"
        placeholder="Search for recipes..."
      />
      <button
        onClick={searchRecipes}
        className="mt-2 px-4 py-2 bg-zinc text-white rounded hover:bg-zinc-700"
      >
        Search
      </button>
      {apiLimitReached ? (
        <p>Apologies! The server is currently down due to too many searches!</p>
      ) : (
        <div className="container mx-auto px-4 h-screen">
          <div className="grid grid-cols-4 gap-4 mt-20">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="relative flex flex-col items-center"
              >
                <div className="relative w-64 h-64 rounded-lg mt-20">
                  <Link
                    href={`/Discover/Recipe/${recipe.id}`}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      width={300}
                      height={300}
                      className="rounded-lg"
                    />
                  </Link>
                  <RiVipCrown2Fill
                    className="absolute top-5 right-5 text-zinc-500 hover:text-white"
                    size={30}
                  />
                </div>
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
      )}
    </section>
  );
}
