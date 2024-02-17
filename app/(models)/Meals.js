import { Schema } from "mongoose";

const MealSchema = new Schema({
  id: Number,
  title: String,
  image: String,
  type: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
  },
});

export default MealSchema;
