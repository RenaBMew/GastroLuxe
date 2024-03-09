"use client";
import React from "react";
import MealPlan from "../(components)/MealPlan";
import { SessionProvider } from "next-auth/react";

const Calendar = () => {
  return (
    <>
      <SessionProvider>
        <MealPlan />
      </SessionProvider>
    </>
  );
};

export default Calendar;
