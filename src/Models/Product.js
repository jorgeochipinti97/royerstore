import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  images: [{ type: String, required: true }],
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  category: { type: String, required: true },
  gender: { type: String },
  tracking: { type: String },
  sku: { type: String },
  talles: [
    {
      nombre: { type: String },
      stock: { type: Number, default: 0 },
    },
  ],
});

const ProductRoyer =
  mongoose.models.ProductRoyer || mongoose.model("ProductRoyer", ProductSchema);

export default ProductRoyer;
