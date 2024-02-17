import { dbConnect } from "@/app/utils/db";
import Favorites from "@/app/(models)/Favorites";

export async function POST(request) {
  try {
    const { email, id, title, image } = await request.json();
    await dbConnect();
    await Favorites.create({ email, id, title, image });
    console.log(Favorites);

    return new Response(JSON.stringify("Recipe added to favorites!"), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.error("Error adding to Favorites: ", error);
    return new Response(JSON.stringify("Error adding to Favorites"), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function GET(request) {
  return new Response("Hello world!");
}

export async function DELETE(request) {
  return new Response("Hello world!");
}
