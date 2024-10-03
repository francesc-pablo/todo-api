import { Schema, model } from "mongoose";

// creating a schema to be created by a model
const todoSchema = new Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, default: false}
});

// exporting the model
export const TodoModel = model('Todo', todoSchema);