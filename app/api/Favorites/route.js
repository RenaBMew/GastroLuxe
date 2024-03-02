import { dbConnect } from "@/app/utils/db";
import User from "@/app/(models)/User";
import FavoriteList from "@/app/(models)/Favorites";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function POST(request) {
  try {
    const body = await request.json();
    const userId = body.userId;
    let { id, title, image } = body;

    if (!userId || !Types.ObjectId.isValid(body.id)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }
    await dbConnect();
    let user = await User.find({ email: body.userId }).exec();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newFavorite = new FavoriteList.model({
      id,
      title,
      image,
    });
    let savedFavorite = await newFavorite.save();
    user = user[0];
    user.favorites = user.favorites.filter(
      (favorite) => favorite.title !== title
    );
    user.favorites.push(savedFavorite);
    await user.save();
    console.log("Favorite added successfully");
    return NextResponse.json(
      { message: "Favorite added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("bottom error catch");
    console.log(error);

    return NextResponse.json(
      { message: "Error adding favorite" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const favorites = await FavoriteList.model.find();
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await dbConnect();
    await FavoriteList.model.findByIdAndDelete(id);
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
