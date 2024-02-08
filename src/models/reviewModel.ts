import { InferSchemaType, Schema, model } from "mongoose";

const reviewSchema = new Schema({
  contentId: {
    type: Number,
    required: [true, "Content Id required!"],
  },
  userId: {
    id: Schema.Types.ObjectId,
  },
  comment: {
    type: String,
    required: [true, "Review text required!"],
    maxlength: 500,
  },
  timestamp: {
    createdAt: "created_at",
  },
});
type Review = InferSchemaType<typeof reviewSchema>;

export default model<Review>("Review", reviewSchema);
