import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import mongoose from "mongoose";

import records from "./routes/records.mjs";
import diaries from "./routes/diaries.mjs";
import users from "./routes/users.mjs";

const PORT = process.env.PORT || 2023;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/records", records);
app.use("/api/v1/users", users);
app.use("/api/v1/diaries", diaries);

app.get("/", (req, res) => {
  res.send("Welcome to Journalise");
});


mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:admin@skilldiarycluster0.juqr9a5.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
