import { Schema } from "mongoose";

const MealSchema = new Schema({
  id: Number,
  title: String,
  image: String,
  meal: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
  },
});

export default MealSchema;
