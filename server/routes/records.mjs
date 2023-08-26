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
      res.status(200).json(diaries);
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
      const body = req.body;
      const record = await Record.create(body);
      const diary = await DiaryRecordRelation.findById(body.diaryId);
      console.log(body.diary);
      if (!diary) {
        return res.status(404).json({ message: "Not Respective Diary found for this user  not found" });
      }
  
      diary.recordIdList.push(record.ObjectId);
      await diary.save();
  
      res.status(200).json({ message: "Record Created Successfully Successfully Created" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });



export default router;

