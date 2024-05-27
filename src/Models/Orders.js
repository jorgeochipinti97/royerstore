import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        title: { type: String },
        size: { type: String },
        personalization: { type: String },
        quantity: { type: Number },
        images: [{ type: String }],
        
        price: { type: Number },


      },
    ],
    numberOfItems: { type: Number },
    total: { type: Number, required: true },
    transactionId: { type: String },
    discountCode: { type: String },
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    phone: { type: String },
    taxid: { type: String },
    discountPrice: { type: Number, default: 0 },
    tracking: { type: String },
    token: { type: String },
    zipCode: { type: String },

  },
  {
    timestamps: true,
  }
);

const OrderRoyer =
  mongoose.models.OrderRoyer || mongoose.model("OrderRoyer", orderSchema);

export default OrderRoyer;
