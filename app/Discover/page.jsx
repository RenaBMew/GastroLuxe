"use client";
import React from "react";
import Search from "../(components)/Search";
import { SessionProvider } from "next-auth/react";

const SearchRecipes = () => {
  return (
    <>
      <SessionProvider>
        <Search />
      </SessionProvider>
    </>
  );
};

export default SearchRecipes;
