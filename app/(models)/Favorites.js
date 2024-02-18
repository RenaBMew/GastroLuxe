import mongoose, { Schema, model, models } from "mongoose";

const FavoriteSchema = new Schema({
  id: Number,
  title: String,
  image: String,
});

export default {
  FavoriteSchema,
  model: models.FavoriteList || model("FavoriteList", FavoriteSchema),
};
