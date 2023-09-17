import express from "express";
//import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import User from "../models/users.mjs";
import Record from "../models/records.mjs";
import DiaryRecordRelation from "../models/diaryRecordRelation.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const records = await Record.find({});
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
  try {

    const body = req.body
    const entry = body.entry;

    const record = await Record.create({
      text: entry,
      metadata: ""
    });

    const query = {
      diaryId: body.diaryId,
      monthYear: new Date(body.date),
    };

    let diaryRecordRelation = await DiaryRecordRelation.findOne(query);

    if (!diaryRecordRelation) {
      diaryRecordRelation = await DiaryRecordRelation.create({
        diaryId: body.diaryId,
        monthYear: new Date(body.date),
        recordIdList: [],
      });
    }

    diaryRecordRelation.recordIdList.push(record.id);
    await diaryRecordRelation.save();

    res
      .status(200)
      .json({ message: "Record Created Successfully Successfully Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
