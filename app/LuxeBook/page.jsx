"use client";
import React from "react";
import LuxeBook from "../(components)/LuxeBook";
import { SessionProvider } from "next-auth/react";

const FavoritesPage = () => {
  return (
    <div>
      <h1>Your LuxeBook</h1>
      <p>Here is what you have Luxed so far!</p>
      <SessionProvider>
        <LuxeBook />
      </SessionProvider>
    </div>
  );
};

export default FavoritesPage;
