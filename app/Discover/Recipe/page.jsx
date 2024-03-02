"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import RecipeDetails from "@/app/(components)/RecipeDetails";

const RecipePage = () => {
  return (
    <div>
      <h1>Recipe Details</h1>
      <p>Get into my belly!</p>
      <SessionProvider>
        <RecipeDetails />
      </SessionProvider>
    </div>
  );
};

export default RecipePage;
