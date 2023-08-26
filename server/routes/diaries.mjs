import express from "express";
//import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import User from "../models/users.mjs";
import Diary from "../models/diaries.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const diaries = await Diary.find({});
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
    const user = await User.findById(id);
    res.status(200).json(user.diaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const diary = await Diary.create(body);
    const user = await User.findById(body.userId);
    console.log(body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.diaries.push(diary.ObjectId);
    await user.save();

    res.status(200).json({ message: "Diary Successfully Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
