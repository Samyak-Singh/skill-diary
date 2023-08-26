import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const diaryRecordRelationSchema = mongoose.Schema(
  {
    diaryId: {
      type: ObjectId,
      required: true,
    },
    monthYear: {
      //TODO: Store this field of Date in Month Year Format.
      type: Date,
      required: true,
    },
    recordIdList: [{ recordId: { type: ObjectId } }],
    recordDate: {
      //TODO: This record date is duplicate of the above month.
      type: Date,
      required: true,
    },
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
