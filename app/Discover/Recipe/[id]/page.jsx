import React from "react";
import Image from "next/image";
import SaveMeal from "@/app/(components)/SaveMeal";
import AuthProvider from "@/app/(components)/AuthProvider";

async function getRecipe(id) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch recipe details");
  }
  return response.json();
}

export default async function RecipeDetails({ params }) {
  const { id } = params;
  const recipe = await getRecipe(id);
  console.log(id);

  return (
    <section id="LuxeBook" className="text-center">
      <div className="container mx-auto px-4 text-left h-screen mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <div className="mb-4 mt-20">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={500}
                height={400}
                className="rounded-lg mt-4"
              />
            </div>
            {/* Nutrition information section */}
            <div className="mb-4 mt-20">
              <h2 className="text-xl font-bold">Nutrition Information</h2>
              <br />
              Serving Size: {recipe.servingSize} Servings: {recipe.servings}{" "}
              Cost Per Serving: {recipe.pricePerServing}
              <br />
              {recipe.nutrition.nutrients
                .slice(0, 10)
                .map((nutrient, index) => (
                  <p key={index}>
                    {nutrient.name}: {nutrient.amount} {nutrient.unit}
                  </p>
                ))}
              <br />
              <h2 className="text-xl font-bold">Dietary Information</h2>
              <br /> Weight Watcher Points: {recipe.weightWatcherSmartPoints}
              {recipe.vegetarian} {recipe.vegan} {recipe.glutenFree}{" "}
              {recipe.dairyFree} {recipe.lowFodmap}{" "}
            </div>
          </div>
          {/* Recipe Information Section */}
          <div className="md:col-span-1">
            <div>
              <h1>{recipe.title}</h1>
              <AuthProvider>
                <SaveMeal recipe={recipe} />{" "}
              </AuthProvider>
              <div className="mt-4">
                <h2 className="text-xl font-bold">Ingredients</h2>
                <ul className="list-disc ml-8">
                  {recipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold">Instructions</h2> | Ready in{" "}
                {recipe.readyInMinutes} Minutes
                <ul className="list-disc list-inside mt-2 list-none">
                  {recipe.instructions.split("\n").map((instruction, index) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: instruction.replace(
                          /(Step \d+:)/,
                          "<strong>$1</strong>"
                        ),
                      }}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
