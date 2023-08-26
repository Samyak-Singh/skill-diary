import { ObjectId } from "mongodb";

import mongoose from "mongoose";

const diariesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    tags: [
      {
        ObjectId: { type: ObjectId },
        tagName: { type: String },
      }
    ],
  },
  {
    timestamps: true,
  }
);
const Diary = mongoose.model("Diary", diariesSchema);
export default Diary;
