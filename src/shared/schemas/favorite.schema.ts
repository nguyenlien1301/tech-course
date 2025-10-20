import { model, models, Schema } from "mongoose";

import { Favorite } from "../types/models";

const favoriteSchema = new Schema<Favorite>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const FavoriteModel =
  models.Favorite || model<Favorite>("Favorite", favoriteSchema);

export default FavoriteModel;
