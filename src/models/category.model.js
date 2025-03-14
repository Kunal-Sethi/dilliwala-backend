import mongoose, { Schema } from "mongoose";
import { Product } from "./product.model.js";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: 1,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("deleteOne", { document: true }, async function (next) {
  const categoryId = this._id;
  await Product.updateMany(
    { category: categoryId },
    { $unset: { category: "" } }
  );
  next();
});

export const Category = mongoose.model("Category", categorySchema);
