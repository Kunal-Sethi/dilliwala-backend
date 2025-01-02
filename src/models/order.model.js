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
      required: false,
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "In process",
        "Fulfilled",
        "Ready for pickup",
        "Completed",
        "Cancelled",
      ],
      require: true,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
