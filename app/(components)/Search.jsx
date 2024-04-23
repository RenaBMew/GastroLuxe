import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "@/app/(styles)/discover.module.css";
// import { RiVipCrown2Fill } from "react-icons/ri";

// TODO: Adjust dynamic icon and add notification to user that meal has been added to list.

export default function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const { data: session } = useSession();
  // const [favIcon, setFavIcon] = useState(false);
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=20&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      //API limit is reached.
      if (data.status === "failure") {
        setApiLimitReached(true);
      } else {
        setRecipes(data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // Add Enter key click to search
  const handleEnterToSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchRecipes();
    }
  };

  // const AddFavorite = async (recipe) => {
  //   console.log(session);
  //   console.log(session.user.email);
  //   try {
  //     const response = await fetch("/api/Favorites", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: session.user.email,
  //         ...recipe,
  //       }),
  //     });
  //     console.log(recipe);

  //     if (response.ok) {
  //       console.log("Recipe added to favorites!");
  //     } else {
  //       console.error("Error adding to favorites:", await response.json());
  //     }
  //   } catch (error) {
  //     console.error("Error adding to favorites:", error);
  //   }
  // };

  // const addFavMeal = (recipe) => {
  //   AddFavorite(recipe);
  //   setFavIcon(true);
  // };

  function shortenTitle(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, text.lastIndexOf(" ", maxLength)) + "...";
  }

  return (
    <section id="Recipe Search" className="container">
      <div className={styles.header}>
        <h1 className={styles.h1}>Search for a Meal</h1>
        <p>Search for something yummy and add it to your LuxeBook!</p>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleEnterToSearch}
          placeholder="Search for recipes..."
        />
        <button onClick={searchRecipes}>Search</button>
      </div>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : apiLimitReached ? (
        <p>Apologies! The server is currently down due to too many searches!</p>
      ) : (
        <div className={styles.mealContainer}>
          {recipes.map((recipe) => (
            <div key={recipe.id} className={styles.mealCard}>
              <Link
                href={`/Discover/Recipe/${recipe.id}`}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={250}
                  height={200}
                  className={styles.img}
                />
                <div className={styles.mealTitle}>
                  <h3 className={styles.h3}>
                    {shortenTitle(recipe.title, 50)}
                  </h3>
                </div>
              </Link>
              {/* <div className={styles.icon}>
                <RiVipCrown2Fill
                  onClick={() => addFavMeal(recipe)}
                  style={{
                    cursor: "pointer",
                    color: favIcon ? "var(--eggplant)" : "",
                  }}
                  size={30}
                />
              </div> */}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
