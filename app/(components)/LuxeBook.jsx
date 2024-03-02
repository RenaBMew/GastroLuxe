import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LuxeBook() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);

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

  useEffect(() => {
    getFavorites();
  }, []);

  const deleteFavorite = async (id) => {
    try {
      const response = await fetch("/api/Favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-4 gap-4 mt-4">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="relative flex flex-col items-center"
          >
            <Link href={`/Discover/Recipe/${favorite.id}`}>
              <div className="relative w-64 h-64 rounded-lg">
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
              onClick={() => deleteFavorite(favorite._id)}
              className="mt-2 px-4 py-2 bg-zinc text-white rounded hover:bg-gray-500"
            >
              UnLuxe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
