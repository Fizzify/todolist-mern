import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TodoItemModel from "./models/TodoItemModel.js";
dotenv.config();

mongoose.connect(process.env.DB_LINK);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getItems", (req, res) => {
  TodoItemModel.find({}, (err, todoItems) => {
    if (err) {
      res.json(err);
    } else {
      res.json(todoItems);
    }
  });
});

app.post("/createItem", async (req, res) => {
  const item = req.body;
  const newItem = new TodoItemModel(item);
  await newItem.save();

  res.json(item);
});

app.post("/deleteItem", (req, res) => {
  const itemIndex = req.body.index;

  TodoItemModel.findOneAndDelete({ index: itemIndex }, (err, result) => {
    if (err) {
      res.json(err);
    }
  });

  res.json(itemIndex);
});

app.listen(3001, () => console.log("Server started on port 3001."));
