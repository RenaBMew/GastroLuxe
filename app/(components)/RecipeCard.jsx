"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const RecipeCard = ({ recipe, handleView, handleFavorite, handleDelete }) => {
  return (
    <div>
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={300}
            height={200}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3>{recipe.title}</h3>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <button
            onClick={() => handleView(recipe.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            View Recipe
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => handleFavorite(recipe.id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded-md"
            >
              Add to Favorites
            </button>
            <button
              onClick={() => handleDelete(recipe.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
