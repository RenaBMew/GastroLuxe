export async function getRecipeDetails(id) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  if (response.status !== 200) return null;
  console.log(id);
  const data = await response.json();
  return data;
}
