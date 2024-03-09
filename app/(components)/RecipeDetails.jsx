import React from "react";
import Image from "next/image";

async function getRecipe(id) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch recipe details");
  }
  return response.json();
}

export default async function RecipeDetails({ params }) {
  const { id } = params;
  const recipe = await getRecipe(id);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-screen-lg w-full px-4">
        <div className="flex flex-col items-center mt-4">
          <h1 className="text-3xl font-bold">
            {recipe.title} - {recipe.id}
          </h1>
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

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useParams } from "next/navigation";

// export default function RecipeDetails() {
//   const params = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   console.log(params);

//   useEffect(() => {
//     async function fetchRecipeDetails(id) {
//       try {
//         const response = await fetch(
//           `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch recipe details");
//         }
//         const data = await response.json();
//         setRecipe(data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     if (params) {
//       fetchRecipeDetails();
//     }
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!recipe) {
//     return <div>Recipe details not found</div>;
//   }

//   return (
//     <>
//       <div>recipe number: {recipe}</div>
//       <div className="flex justify-center items-center h-screen">
//         <div className="max-w-screen-lg w-full px-4">
//           <div className="flex flex-col items-center mt-4">
//             <h1 className="text-3xl font-bold">
//               {recipe.title} - {id}
//             </h1>
//             <Image
//               src={recipe.image}
//               alt={recipe.title}
//               width={400}
//               height={300}
//               className="rounded-lg mt-4"
//             />
//             <div className="mt-4">
//               <h2 className="text-xl font-bold">Ingredients</h2>
//               <ul className="list-disc ml-8">
//                 {recipe.extendedIngredients.map((ingredient) => (
//                   <li key={ingredient.id}>{ingredient.original}</li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mt-4">
//               <h2 className="text-xl font-bold">Instructions</h2>
//               <div
//                 dangerouslySetInnerHTML={{ __html: recipe.instructions }}
//                 className="mt-2"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// import Image from "next/image";

// rameters - not working?
// async function fetchRecipeDetails(id) {
//   const response = await fetch(
//     `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch recipe details");
//   }
//   return response.json();
// }

// export default async function RecipeDetails({ params }) {
//   const { id } = params;
//   const recipe = await fetchRecipeDetails(id);
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="max-w-screen-lg w-full px-4">
//         <div className="flex flex-col items-center mt-4">
//           <h1 className="text-3xl font-bold">
//             {recipe.title} - {recipe.id}
//           </h1>
//           <Image
//             src={recipe.image}
//             alt={recipe.title}
//             width={400}
//             height={300}
//             className="rounded-lg mt-4"
//           />
//           <div className="mt-4">
//             <h2 className="text-xl font-bold">Ingredients</h2>
//             <ul className="list-disc ml-8">
//               {recipe.extendedIngredients.map((ingredient) => (
//                 <li key={ingredient.id}>{ingredient.original}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="mt-4">
//             <h2 className="text-xl font-bold">Instructions</h2>
//             <div
//               dangerouslySetInnerHTML={{ __html: recipe.instructions }}
//               className="mt-2"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
