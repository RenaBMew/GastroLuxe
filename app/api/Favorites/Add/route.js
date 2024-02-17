import { dbConnect } from "@/app/utils/db";
import User from "@/app/(models)/User";

export const POST = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const body = await request.json();
    const { id, title, image } = body;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return {
        status: 400,
        body: JSON.stringify({ message: "Invalid user id" }),
      };
    }

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return {
        status: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    const newFavorite = new Favorite({
      id,
      title,
      image,
      user: new Types.ObjectId(userId),
    });

    await newFavorite.save();
    return {
      status: 200,
      body: JSON.stringify({ message: "Favorite added successfully" }),
    };
  } catch (error) {
    return {
      status: 500,
      body: JSON.stringify({
        message: "Error adding favorite",
        error: error.message,
      }),
    };
  }
};
