import { InferSchemaType, Schema, model } from "mongoose";

const reviewSchema = new Schema({
  contentId: {
    type: Number,
    required: [true, "Content Id required!"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User Id required!"],
  },
  comment: {
    type: String,
    required: [true, "Review text required!"],
    maxlength: 500,
  },
  timestamps: {
    createdAt:Date
  },
});
type Review = InferSchemaType<typeof reviewSchema>;

export default model<Review>("Review", reviewSchema);
