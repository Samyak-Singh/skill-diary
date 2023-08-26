import { ObjectId } from "mongodb";

import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Valid Username"],
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    diaries: {
      type: [ObjectId],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", usersSchema);
export default User;
