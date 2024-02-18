// export async function searchRecipes() {
//   try {
//     const APIKEY = process.env.SPOONACULARKEY;
//     const SPOONURL = await fetch(
//       `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${APIKEY}`
//     );
//     const response = await fetch(SPOONURL);
//     const data = await response.data;
//     return data;
//     //setRecipes(data.results);
//   } catch (error) {
//     console.error("Error finding recipes: ", error);
//   }
// }

// import { searchRecipes } from "../api/Search/route";

// const handleSearch = async (e) => {
//   e.preventDefault();
//   const data = await searchRecipes({ query });
//   setRecipes(data);
// };
