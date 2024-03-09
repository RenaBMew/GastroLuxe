import { dbConnect } from "@/app/utils/db";
import User from "@/app/(models)/User";
import { NextResponse } from "next/server";

//Add favorite to array
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, id, title, image } = body;
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const existingFavoriteIndex = user.favorites.findIndex(
      (favorite) => favorite.title === title
    );
    //TODO: add logic on search page to check if recipe is already in favorites
    if (existingFavoriteIndex !== -1) {
      user.favorites[existingFavoriteIndex].id = id;
      user.favorites[existingFavoriteIndex].image = image;
    } else {
      user.favorites.push({
        id,
        title,
        image,
      });
    }

    await user.save();

    console.log("Favorite added successfully");
    return NextResponse.json(
      { message: "Favorite added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { message: "Error adding favorite" },
      { status: 500 }
    );
  }
}

//GET favorites array
export async function GET() {
  try {
    await dbConnect();
    const favorites = await User.distinct("favorites", {});
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/// Remove favorite from array
export async function DELETE(request) {
  try {
    const { email, id } = await request.json();
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    user.favorites = user.favorites.filter((favorite) => favorite.id !== id);
    await user.save();
    console.log("Favorite deleted successfully");
    return NextResponse.json(
      { message: "Favorite deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
