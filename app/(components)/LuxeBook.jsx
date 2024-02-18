import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

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
    <div>
      <h1>LuxeBook</h1>
      <div>
        {favorites.map((favorite) => (
          <div key={favorite.id}>
            <h3>{favorite.title}</h3>
            <img src={favorite.image} alt={favorite.title} />
            <button onClick={() => deleteFavorite(favorite._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
