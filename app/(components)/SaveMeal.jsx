"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { RiVipCrown2Fill } from "react-icons/ri";

export default function SaveMeal({ recipe }) {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const { data: session } = useSession();

  const AddFavorite = async (recipe) => {
    console.log("User:", session.user.email);
    try {
      const response = await fetch("/api/Favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          // ...recipe,
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
        }),
      });
      console.log(recipe);

      if (response.ok) {
        console.log("Recipe added to favorites!");
      } else {
        console.error("Error adding to favorites:", await response.json());
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const AddToCalendar = async () => {
    console.log("User:", session.user.email);

    try {
      const response = await fetch(`/api/MealPlan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          meals: {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            day: selectedDay,
            meal: selectedMealType,
          },
        }),
      });
      console.log(response);
      if (response.ok) {
        console.log("Recipe added to calendar!");
        setSelectedDay("");
        setSelectedMealType("");
      } else {
        console.error("Error adding to calendar:", await response.json());
      }
    } catch (error) {
      console.error("Error adding to calendar:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-10">
        <button
          onClick={() => AddFavorite(recipe)}
          className="mt-2 px-4 py-2 bg-zinc text-white rounded hover:bg-zinc-700"
        >
          Add to Favorites
        </button>
      </div>
      <div>
        <h3 className="font-bold text-xl mt-10">Add to Calendar</h3>
        <label htmlFor="day" className="font-bold">
          Day:
        </label>
        <select
          id="day"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="mt-2 px-2 py-2 bg-white text-black rounded "
        >
          <option value="">Select a Day</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
        <label htmlFor="meal" className="font-bold ml-5">
          Meal:
        </label>
        <select
          id="meal"
          value={selectedMealType}
          onChange={(e) => setSelectedMealType(e.target.value)}
          className="mt-2 px-2 py-2 bg-white text-black rounded "
        >
          <option value="">Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        <button
          onClick={AddToCalendar}
          className="mt-2 ml-5 px-4 py-2 bg-zinc text-white rounded hover:bg-zinc-700"
        >
          Add to Calendar
        </button>
      </div>
    </>
  );
}
