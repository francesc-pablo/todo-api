import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

// creating a schema to be created by a model
const todoSchema = new Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, default: false}
}, {
    timestamps: true
});

// text search
todoSchema.index({ name: 'text', title: 'text' });

// applying toJson to fix _id in the database
todoSchema.plugin(toJSON);

// exporting the model
export const TodoModel = model('Todo', todoSchema);