"use client";
import React from "react";
import Search from "../(components)/Search";
import { SessionProvider } from "next-auth/react";

const SearchRecipes = () => {
  return (
    <div>
      <h1>Create an Account</h1>
      <p>Use the form to create an account.</p>
      <SessionProvider>
        <Search />
      </SessionProvider>
    </div>
  );
};

export default SearchRecipes;
