import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Home = async () => {
  const session = await getServerSession(options);
  return (
    <div>
      <div className="splash">
        <div className="splash-bg">
          <Image
            src="/indexbg02.jpg"
            alt="background image"
            objectFit="cover"
            fill={true}
          />
        </div>
      </div>

      <div className="herobanner">
        <h1 className="splashTitle">GastroLuxe</h1>
        <p>
          Welcome to GastroLuxe, where foodies can find their next culinary
          adventure and eat Luxuriously!
        </p>
        {session ? (
          <>
            {" "}
            <p className="pt-10">Welcome back {session.user.name}!</p>
            <p>Ready to get cooking? Lets see whats on the menu!</p>
            <Link href="/MealPlan">
              <button className="mt-10">Your Meal Plan!</button>
            </Link>
          </>
        ) : (
          <>
            <p>
              If you do not have an account already, please create one below!
            </p>
            <Link href="/Register">
              <button className="mt-10">Sign Up!</button>
            </Link>
          </>
        )}
      </div>
      <div className="intro-container">
        <div className="intro-blurb">
          <Image
            src="/avospintoast.jpg"
            alt="Avocado Spinach Toast"
            width={350}
            height={300}
            className="img-basic"
          />
          <p>
            GastroLuxe allows you to search for meals with the{" "}
            <Link href="https://spoonacular.com/food-api" target="_new">
              Spoonacular API
            </Link>
            . Meals can be searched for by based on ingredients, meal type,
            calories, dietary restrictions, and more. Meal information includes
            ingredients, cooking and preparation instructions, nutritional
            information, and dietary concerns. Create an account to begin
            searching for meals and to start cooking!
          </p>
        </div>
        <div className="intro-blurb">
          <Image
            src="/basilspag.jpg"
            alt="Basil Spaghetti with Tomatoes and Mozarella"
            width={350}
            height={300}
            className="img-basic"
          />
          <p>
            Registered users can build a list of favorite meals by adding them
            to their own LuxeBook allowing for quick reference. Users can also
            create a meal plan for the week with breakfast, lunch, and dinner
            options.
          </p>
        </div>
        <div className="intro-blurb">
          <Image
            src="/sushi.jpg"
            alt="Sushi with Eel Sauce and Wasabi"
            width={350}
            height={300}
            className="img-basic"
          />
          <p>
            GastroLuxe is still in development and future features include
            user-submitted meals, meal ratings, and meal reviews. Meal plans
            will eventually be sharable, and users will be able view other users
            meal plans. Shopping lists will be generated based on meal plans and
            favorite meals and these ingredients can also be auto-added to a
            favorite grocery delivery service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
