import express from "express";
//import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import User from "../models/users.mjs";
import UserDiaryRelation from "../models/userDiaryRelation.mjs";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userCredential = req.body;
    console.log(userCredential);
    const userCredentialInfo = await User.create(userCredential);
    console.log(userCredentialInfo);

    const userDiaryRelation = {
      userId: userCredentialInfo._id,
      diaries: [],
    }
    const userDiaryRelationInfo = await UserDiaryRelation.create(userDiaryRelation);
    console.log(userDiaryRelationInfo);

    res.status(200).json({ message: "User Registration Success!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {id} =  req.params; 
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ message: "User Created Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
