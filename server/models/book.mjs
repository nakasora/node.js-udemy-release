import { Schema, model } from "mongoose";

const bookSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
      get: (val) => {
        return Math.round(val);
      },
      set: (val) => {
        return Math.round(val);
      },
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Book = new model("Book", bookSchema);
export default Book;
