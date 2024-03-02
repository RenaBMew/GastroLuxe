import { useState, useEffect } from "react";
import Image from "next/image";
const { useRouter, useParams } = require("next/navigation");

//userouter is a hook that gives you access to the router object
//useParams is a hook that returns an object of key/value pairs of URL parameters - not working?

export default function RecipeDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Recipe details not found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-screen-lg w-full px-4">
        <div className="flex flex-col items-center mt-4">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={400}
            height={300}
            className="rounded-lg mt-4"
          />
          <div className="mt-4">
            <h2 className="text-xl font-bold">Ingredients</h2>
            <ul className="list-disc ml-8">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Instructions</h2>
            <div
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//// 404?

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function RecipeDetails() {
//   const router = useRouter();
//   const [recipe, setRecipe] = useState(null);
//   const { data: session } = useSession();

//   useEffect(() => {
//     const { id } = router.query;
//     if (id) {
//       fetchRecipe(id);
//     }
//   }, [router.query]);

//   async function fetchRecipe(id) {
//     try {
//       const response = await fetch(
//         `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
//       );
//       const data = await response.json();
//       setRecipe(data);
//     } catch (error) {
//       console.error("Error fetching recipe:", error);
//     }
//   }

//   if (!recipe) {
//     return <div>Loading...</div>;
//   }
