import mongoose, { Schema } from "mongoose";

const FavoriteSchema = new Schema({
  email: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: Number,
  title: String,
  image: String,
});

export default mongoose.models.Favorites ||
  mongoose.model("Favorites", FavoriteSchema);
