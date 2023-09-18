import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Record from "./records.mjs";

const diaryRecordRelationSchema = mongoose.Schema(
  {
    diaryId: {
      type: ObjectId,
      required: true,
    },
    monthYear: {
      //TODO: Store this field of Date in Month Year Format.
      type: Number,
      required: true,
    },
    recordIdList: [{
      recordId: {
        type: ObjectId,
        ref: Record
      },
      date: {
        type: Number,
        required: true,
      }
    }]
    //TODO: We have the scope to add the time in the list as well. 
  },
  {
    timestamps: true,
  }
);

diaryRecordRelationSchema.index({diaryId: -1, monthYear: -1});

const DiaryRecordRelation = mongoose.model(
  "DiaryRecordRelation",
  diaryRecordRelationSchema
);
export default DiaryRecordRelation;
