import { dbConnect } from "@/app/utils/db";
import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function GET() {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    const email = session.user.email;
    console.log("BE Email:", email);

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const calendar = user.calendar;
    return NextResponse.json(calendar, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// add meal to calendar - day/meal type
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, meals } = body;

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // check current array, if day exists, add meal to day, else create new day
    const findDay = user.calendar.findIndex((item) => item.day === meals.day);
    if (findDay === -1) {
      user.calendar.push({
        day: meals.day,
        meals: [
          {
            id: meals.id,
            title: meals.title,
            image: meals.image,
            meal: meals.meal,
          },
        ],
      });
    } else {
      user.calendar[findDay].meals.push({
        id: meals.id,
        title: meals.title,
        image: meals.image,
        meal: meals.meal,
      });
    }
    await user.save();

    console.log("Meal Plan added successfully");
    return NextResponse.json(
      { message: "Meal Plan added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error adding meal plan" },
      { status: 500 }
    );
  }
}

// delete meal from calendar - day/meal type
export async function DELETE(request) {
  try {
    const { email, id } = await request.json();
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const findMeal = user.calendar.find((day) =>
      day.meals.some((meal) => meal.id === id)
    );
    if (!findMeal) {
      return NextResponse.json(
        { message: "No Meal Found in DB." },
        { status: 404 }
      );
    }
    const mealArray = findMeal.meals.findIndex((meal) => meal.id === id);
    if (mealArray !== -1) {
      findMeal.meals.splice(mealArray, 1);
      await user.save();
      return NextResponse.json(
        { message: "Meal deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting meal:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Saving for future Implentation
// export async function PUT(request) {
//   try {
//     const body = await request.json();
//     const { id, day, meal } = body;
//     await dbConnect();
//     const user = await User.findOne({ "meals.id": id });
//     if (!user) {
//       return NextResponse.json({ message: "Meal not found" }, { status: 404 });
//     }
//     const mealPlan = user.meals.id(id);
//     mealPlan.day = day;
//     mealPlan.meal = meal;
//     await user.save();
//     return NextResponse.json(
//       { message: "Meal Plan updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating meal plan:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
