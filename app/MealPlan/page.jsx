"use client";
import React from "react";
import MealPlan from "../(components)/MealPlan";
import { SessionProvider } from "next-auth/react";

const Calendar = () => {
  return (
    <div>
      <h1>Your Meal Plan</h1>
      <p>Here is your weekly meal plan.</p>
      <SessionProvider>
        <MealPlan />
      </SessionProvider>
    </div>
  );
};

export default Calendar;
