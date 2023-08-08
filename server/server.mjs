import express from "express";
import cors from "cors"; 
import "./loadEnvironment.mjs"; 

import records from "./routes/records.mjs"; 

import users from "./routes/users.mjs"; 


const PORT = process.env.PORT || 2023;
const app = express(); 

app.use(cors());
app.use(express.json()); 

app.use("/records",records); 
app.use("/users",records);

app.listen(PORT, () =>{
    console.log(`Server is running on port : ${PORT}`);
})


