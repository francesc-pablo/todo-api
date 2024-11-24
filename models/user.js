import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

// creating a schema to be created by a model
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'vendor', 'admin', 'superadmin'] }
}, {
    timestamps: true
});

// text search
userSchema.index({ name: 'text', title: 'text' });

// applying toJson
userSchema.plugin(toJSON);

// exporting the model
export const UserModel = model('User', userSchema);