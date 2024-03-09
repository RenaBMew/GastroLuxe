import { Schema } from "mongoose";

const FavoriteSchema = new Schema({
  id: Number,
  title: String,
  image: String,
});

export default FavoriteSchema;
