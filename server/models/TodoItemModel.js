import mongoose from "mongoose";

const todoItemSchema = new mongoose.Schema({
  item: String
});

const TodoItemModel = mongoose.model("TodoItem", todoItemSchema);

export default TodoItemModel;