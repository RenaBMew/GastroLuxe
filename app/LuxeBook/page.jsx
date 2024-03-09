"use client";
import React from "react";
import LuxeBook from "../(components)/LuxeBook";
import { SessionProvider } from "next-auth/react";

const FavoritesPage = () => {
  return (
    <>
      <SessionProvider>
        <LuxeBook />
      </SessionProvider>
    </>
  );
};

export default FavoritesPage;
