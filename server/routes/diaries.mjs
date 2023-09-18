import express from "express";
//import db from "../db/conn.mjs";
import Diary from "../models/diaries.mjs";
import DiaryRecordRelation from "../models/diaryRecordRelation.mjs";
import UserDiaryRelation from "../models/userDiaryRelation.mjs";
import Record from "../models/records.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const diaries = await Diary.find({});
    if (diaries.length === 0) {
      return res.status(204).json({ message: "No diaries found" });
    }
    res.status(200).json(diaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const diary = await Diary.findById(id);
    res.status(200).json(diary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("------------------------------------------------");
    console.log("Fetching diaries for User id ", id);
    const userDiaryRelation = await UserDiaryRelation.findOne({ userId: id });
    if (!userDiaryRelation || !userDiaryRelation.diaries) {
      return res.status(404).json({ message: "User has no diaries" });
    }
    const diaryIds = userDiaryRelation.diaries;
    const diaryPromises = diaryIds.map(async (diaryId) => {
      const diary = await Diary.findById(diaryId);
      return diary;
    });

    const diaries = await Promise.all(diaryPromises);

    console.log("Diaries of user are ", diaries);
    res.status(200).json(diaries);
    console.log("------------------------------------------------");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/users/:id", async (req, res) => {
  console.log("------------------------------------------------");
  const userId = req.params.id;
  console.log("Creating a new diary ", req.body);
  const { diaryName, diaryDesc } = req.body;
  console.log("Creating new diary for userId: ", userId, "diary: ", req.body);
  try {
    const diary = await Diary.create({
      name: diaryName,
      description: diaryDesc,
    });
    let userDiaryRelation = await UserDiaryRelation.findOne({ userId: userId });
    if (!userDiaryRelation) {
      console.log("User Diary Relation not found. Creating new one");
      userDiaryRelation = await UserDiaryRelation.create({
        userId: userId,
        diaries: [],
      });
    }
    userDiaryRelation.diaries.push(diary);
    console.log("User Diary Relation is ", userDiaryRelation);
    await userDiaryRelation.save();
    res.status(200).json({ message: "Diary Successfully Created" });
    console.log("------------------------------------------------");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }

});

router.delete("/", async (req, res) => {
  console.log("------------------------------------------------");
  try {
    const { diaryId, userId } = req.body;
    console.log("Request body is ", req.body)
    console.log("Deleting diary ", diaryId, " of user ", userId);

    const diary = await Diary.findById(diaryId);
    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }
    console.log("Diary to be deleted ", diary);

    const diaryRecordRelation = await DiaryRecordRelation.findOne({ diaryId: diaryId });

    const recordsList = diaryRecordRelation.recordIdList;
    console.log("Records list in the above diary is ", recordsList);
    recordsList && recordsList.forEach(async ({ recordId, date }) => {
      console.log("Deleting Record ", recordId);
      await Record.findByIdAndDelete(recordId);
    });


    const user = await UserDiaryRelation.findOne({ userId: userId });
    const diaryList = user.diaries;
    console.log("Diary list of user is ", diaryList);
    const index = diaryList.indexOf(diaryId);
    diaryList.splice(index, 1);
    user.diaries = diaryList;
    console.log("updated diary list of user ", user.diaries);
    await user.save();
    await Diary.findByIdAndDelete(diaryId);
    await DiaryRecordRelation.findOneAndDelete({ diaryId: diaryId });

    res.status(200).json({ message: "Diary Successfully Deleted" });
    console.log("------------------------------------------------");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
