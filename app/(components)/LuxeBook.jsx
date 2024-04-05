import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";
import styles from "@/app/(styles)/luxebook.module.css";
import { FaTrash } from "react-icons/fa";

export default function LuxeBook() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

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
      getFavorites();
    }
  }, [session, loading]);

  const getFavorites = async () => {
    try {
      const response = await fetch("/api/Favorites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      const response = await fetch("/api/Favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          id,
        }),
      });

      if (response.ok) {
        console.log("Favorite deleted successfully");
        getFavorites();
      } else {
        console.error("Error deleting favorite:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  return (
    <section id="LuxeBook" className="container">
      <div className={styles.header}>
        <h1 className={styles.h1}>Your LuxeBook</h1>
        <p>Here is what you have Luxed so far!</p>
      </div>
      <div className={styles.mealContainer}>
        {favorites.map((favorite) => (
          <div key={favorite.id} className={styles.mealCard}>
            <Link href={`/Discover/Recipe/${favorite.id}`}>
              <Image
                src={favorite.image}
                alt={favorite.title}
                width={300}
                height={220}
                className={styles.img}
              />
              <div className={styles.mealTitle}>
                <h3 className={styles.h3}>{favorite.title}</h3>
              </div>
            </Link>
            <div className={styles.trash}>
              <FaTrash
                onClick={() => deleteFavorite(favorite.id)}
                size={25}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
