import { ObjectId } from "mongodb";

import mongoose from "mongoose";

const userDiaryRelationSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    diaries: {
      type: [ObjectId],
      required: false,
      default: [],
    },
  }
);
const UserDiaryRelation = mongoose.model("UserDiaryRelation", userDiaryRelationSchema);
export default UserDiaryRelation;
