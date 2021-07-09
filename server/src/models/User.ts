import { Schema, model, Types } from "mongoose";

const schema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: "Link" }],
});

export const User = model("User", schema);
