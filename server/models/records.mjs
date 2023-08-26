import mongoose from "mongoose";

const recordsSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Not able to Insert an Empty record!"],
    },
    metaData: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Record = mongoose.model("Record", recordsSchema);
export default Record;
