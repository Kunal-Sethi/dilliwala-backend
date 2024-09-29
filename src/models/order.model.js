import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    orderTotal: {
      type: Number,
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Ready for pickup", "Picked up", "Cancelled"],
      require: true,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
