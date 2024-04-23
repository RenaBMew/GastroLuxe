import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "next-auth/react";
import styles from "@/app/(styles)/meals.module.css";
import { FaTrash } from "react-icons/fa";

//TODO: Adjust logic to delete meal type by ID.

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

  function shortenTitle(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, text.lastIndexOf(" ", maxLength)) + "...";
  }

  // meal card or 'add' button > link to search, argue mealType for UI label
  const mealCard = (meal, mealType) => {
    if (meal) {
      return (
        <div className={styles.mealCard}>
          <Link href={`/Discover/Recipe/${meal.id}`}>
            <Image
              src={meal.image}
              alt={meal.title}
              width={200}
              height={250}
              className={styles.img}
            />
            <div className={styles.mealTitle}>
              <h3 className={styles.h3}>{mealType}</h3>
              <p className={styles.p}>{shortenTitle(meal.title, 30)}</p>
            </div>
          </Link>
          <div className={styles.trash}>
            <FaTrash
              onClick={() => deleteMeal(meal.id)}
              size={20}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.noMealContainer}>
          <p className={styles.noMeal}>No meal planned for this day.</p>
        </div>
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
    <section id="Meal Calendar" className="container">
      <div className={styles.header}>
        <h1 className={styles.h1}>Your Meal Plan</h1>
        <p>Here is your weekly meal plan.</p>
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className={styles.calendar}>
          {calendar.map((dayMeals, index) => (
            <div key={index} className={styles.dayColumn}>
              <div className={styles.dayTitle}>
                {dayMeals?.day || "No Meal Available"}
              </div>
              <div className={styles.mealType}>
                {mealCard(
                  dayMeals?.meals.find((meal) => meal.meal === "breakfast"),
                  "Breakfast"
                )}
              </div>
              <div className={styles.mealType}>
                {mealCard(
                  dayMeals?.meals.find((meal) => meal.meal === "lunch"),
                  "Lunch"
                )}
              </div>
              <div className={styles.mealType}>
                {mealCard(
                  dayMeals?.meals.find((meal) => meal.meal === "dinner"),
                  "Dinner"
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
