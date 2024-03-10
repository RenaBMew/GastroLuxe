import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";

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
    <section id="LuxeBook" className="text-center">
      <h1>Your LuxeBook</h1>
      <p>Here is what you have Luxed so far!</p>
      <div className="container mx-auto px-4 h-screen">
        <div className="grid grid-cols-4 gap-4 mt-20">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="relative flex flex-col items-center"
            >
              <Link href={`/Discover/Recipe/${favorite.id}`}>
                <div className="relative w-64 h-64 rounded-lg mt-20">
                  <Image
                    src={favorite.image}
                    alt={favorite.title}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />{" "}
                </div>
              </Link>
              <h3 className="font-bold">{favorite.title}</h3>
              <button
                onClick={() => deleteFavorite(favorite.id)}
                className="mt-2 px-4 py-2 bg-zinc text-white rounded hover:bg-gray-500"
              >
                UnLuxe
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
