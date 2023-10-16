import express from "express";
//import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import User from "../models/users.mjs";
import Record from "../models/records.mjs";
import DiaryRecordRelation from "../models/diaryRecordRelation.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { diaryId, monthYear, date } = req.body;
    const diaryRecordRelation = await DiaryRecordRelation.findOne({
      diaryId: diaryId,
      monthYear: monthYear,
    })
    console.log("diaryRecordRelation: ", diaryRecordRelation, " recordsList: ", diaryRecordRelation.recordIdList);
    const recordIdList = diaryRecordRelation.recordIdList.filter((item) => {
      return item.date === date
    });
    console.log("recordIdList: ", recordIdList);
    const records = await Record.findById(recordIdList[0].recordId);
    console.log(records);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  console.log("------------------------------------------------");
  try {
    const body = req.body
    const entry = body.entry;
    // monthYear is number in the format of 202309 which represents September 2023 which is extacted from body.date
    const monthYear = parseInt(body.date.substring(0, 4) + body.date.substring(5, 7));
    // date is the date in the format of 01 whichis basically the day that is extacted from body.date
    const date = parseInt(body.date.substring(8, 10));
    console.log("body.date: ", body.date, "monthYear", monthYear);

    const record = await Record.create({
      text: entry,
      metadata: ""
    });

    const query = {
      diaryId: body.diaryId,
      monthYear: monthYear,
    };

    let diaryRecordRelation = await DiaryRecordRelation.findOne(query);

    if (!diaryRecordRelation) {
      diaryRecordRelation = await DiaryRecordRelation.create({
        diaryId: body.diaryId,
        monthYear: monthYear,
        recordIdList: [],
      });
    }

    diaryRecordRelation.recordIdList.push({
      recordId: record._id,
      date: date,
    });
    await diaryRecordRelation.save();

    res
      .status(200)
      .json({ message: "Record Created Successfully" });
    console.log("------------------------------------------------");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
