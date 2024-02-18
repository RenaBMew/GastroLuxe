"use client";
import React from "react";
import Search from "../(components)/Search";
import { SessionProvider } from "next-auth/react";

const SearchRecipes = () => {
  return (
    <div>
      <h1>Search for a Recipe</h1>
      <p>Search for something yummy and add it to your LuxeBook!</p>
      <SessionProvider>
        <Search />
      </SessionProvider>
    </div>
  );
};

export default SearchRecipes;
