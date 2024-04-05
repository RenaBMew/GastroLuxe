"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import NotificationModal from "@/app/(modals)/notification";

export default function SaveMeal({ recipe }) {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const { data: session } = useSession();
  const [notification, setNotification] = useState(null);

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
        showNotification("Recipe added to your LuxeBook!");
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
        showNotification("Recipe added to your Calendar!");
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

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <>
      <div className="text-center">
        <button onClick={() => AddFavorite(recipe)}>Add to LuxeBook!</button>
      </div>
      <div className="text-center mt-5">
        <h3>Add to Calendar</h3>

        <select
          id="day"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
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

        <select
          id="meal"
          value={selectedMealType}
          onChange={(e) => setSelectedMealType(e.target.value)}
        >
          <option value="">Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        <button onClick={AddToCalendar}>Add to Calendar</button>
      </div>
      {notification && <NotificationModal message={notification} />}
    </>
  );
}
