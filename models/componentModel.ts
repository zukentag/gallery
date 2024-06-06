import mongoose from "mongoose";

const componenetSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  component: { type: String, required: true },
  meta: { type: String, required: true },
  code: { type: String, required: true },
  sourceCode: { type: String, required: true },
  language: { type: String, required: true },
});

const Components =
  mongoose.models.components || mongoose.model("components", componenetSchema);
export default Components;
