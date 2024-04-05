import React from "react";
import Image from "next/image";
import SaveMeal from "@/app/(components)/SaveMeal";
import AuthProvider from "@/app/(components)/AuthProvider";
import styles from "@/app/(styles)/details.module.css";

//TODO: pop-up Modal Component for user to select day and meal type to add to calendar with notification of success.
//TODO: Favorites Icon on image corner with notification of success.

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
    <section id="LuxeBook" className={styles.container}>
      <div className={styles.mealContainer}>
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={500}
          height={400}
          className={styles.img}
        />

        {/* Nutrition information section */}
        <div className={styles.card}>
          <h2>Nutrition Information</h2>
          <b>Serving Size: </b> {recipe.servingSize}
          <br /> <b>Servings: </b> {recipe.servings}
          <br /> <b>Cost Per Serving: </b> {recipe.pricePerServing}
          <br />
          {recipe.nutrition.nutrients.slice(0, 10).map((nutrient, index) => (
            <p key={index}>
              <b>{nutrient.name}: </b>
              {nutrient.amount} {nutrient.unit}
            </p>
          ))}
          <h2>Dietary Information</h2>
          <b>Weight Watcher Points: </b>
          {recipe.weightWatcherSmartPoints}
          {recipe.vegetarian} {recipe.vegan} {recipe.glutenFree}{" "}
          {recipe.dairyFree} {recipe.lowFodmap}{" "}
        </div>
      </div>

      {/* Recipe Information Section */}
      <div className={styles.mealContainer}>
        <div className={styles.cardInstructions}>
          <h1 className="text-center">{recipe.title}</h1>
          <AuthProvider>
            <SaveMeal recipe={recipe} />{" "}
          </AuthProvider>
          <div>
            <h2>Ingredients</h2>
            <ul className="list-disc ml-8">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Instructions</h2>
            <i>Ready in {recipe.readyInMinutes} Minutes</i>
            {recipe.instructions ? (
              <>
                <ul className="list-disc list-inside list-none">
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
              </>
            ) : (
              <p>
                Oops!
                <br />
                {recipe.title} does not seem to have instructions. Maybe you
                could try making this without them?
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
