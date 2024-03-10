import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";

export default function MealPlan() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (!loading && session) {
      console.log("FE User:", session.user.email);
      getCalendar();
    }
  }, [session, loading]);

  const getCalendar = async () => {
    try {
      const response = await fetch("/api/MealPlan", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const sortMeals = sortMealsByDay(data);
      setCalendar(sortMeals);
    } catch (error) {
      console.error("Error fetching calendar:", error);
    }
  };

  //sort by day, iterate, return array
  const sortMealsByDay = (data) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    //map days, find day in data, compare day to data, return day || empty array
    return days.map(
      (day) => data.find((d) => d.day === day) || { day, meals: [] }
    );
  };

  // meal card or 'add' button > link to search, argue mealType for UI label
  const mealCard = (meal, mealType) => {
    if (meal) {
      return (
        <>
          <div className="relative rounded-lg flex flex-col justify-center items-center h-50">
            <p className="absolute top-0 left-0 bg-zinc text-white px-2 py-1 rounded-tl-lg rounded-br-lg">
              {mealType}
            </p>
            <Link href={`/Discover/Recipe/${meal.id}`}>
              <Image
                src={meal.image}
                alt={meal.title}
                width={300}
                height={300}
                className="rounded-lg"
              />
            </Link>
            <FaTrash
              onClick={() => deleteMeal(meal.id)}
              className="absolute bottom-1 right-1 text-zinc-500 hover:text-white"
              size={20}
              style={{ cursor: "pointer" }}
            />
          </div>
          <p>{meal.title}</p>
        </>
      );
    } else {
      return (
        <>
          <div className="flex justify-center items-center h-[10rem]">
            <p className="text-zinc">No meal planned for this day.</p>
          </div>
        </>
      );
    }
  };

  const deleteMeal = async (id) => {
    try {
      const response = await fetch("/api/MealPlan", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          id,
        }),
      });
      console.log(id, session.user.email);

      if (response.ok) {
        console.log("Meal deleted successfully");
        getCalendar();
      } else {
        console.error("Error deleting Meal:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting Meal:", error);
    }
  };

  return (
    <section id="Meal Calendar" className="text-center">
      <h1>Your Meal Plan</h1>
      <p>Here is your weekly meal plan.</p>
      <div className="grid grid-cols-7 gap-2 h-screen">
        {calendar.map((dayMeals, index) => (
          <div key={index} className="mt-20">
            <div
              className={`col-start-${
                index + 1
              } row-start-1 font-bold text-lg h-10`}
            >
              {dayMeals?.day || "No Meal Available"}
            </div>
            {/* Rows 2,3,4 meal type */}
            <div
              className={`col-start-${index + 1} row-start-2 mt-10 h-[10rem]`}
            >
              {mealCard(
                dayMeals?.meals.find((meal) => meal.meal === "breakfast"),
                "Breakfast"
              )}
            </div>
            <div
              className={`col-start-${index + 1} row-start-3 mt-10 h-[10rem]`}
            >
              {mealCard(
                dayMeals?.meals.find((meal) => meal.meal === "lunch"),
                "Lunch"
              )}
            </div>
            <div
              className={`col-start-${index + 1} row-start-4 mt-10 h-[10rem]`}
            >
              {mealCard(
                dayMeals?.meals.find((meal) => meal.meal === "dinner"),
                "Dinner"
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
