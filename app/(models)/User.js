import mongoose, { Schema, model, models } from "mongoose";
import FavoriteSchema from "./Favorites";
import MealSchema from "./Meals";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
  },
  favorites: [FavoriteSchema],
  calendar: [
    {
      day: {
        type: String,
        enum: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      meals: [MealSchema],
    },
  ],
});

export default models.User || model("User", UserSchema);
