import { Schema, model } from "mongoose";

const orderSchema = new Schema(
 {
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
   {
    name: { type: String, require: true },
    qty: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
   },
  ],
  shippingAddress: {
   address: { type: String, require: true },
   city: { type: String, require: true },
   postalCode: { type: String, require: true },
   country: { type: String, require: true },
  },
  itemsPrice: { type: Number, require: true, default: 0.0 },
  taxPrice: { type: Number, require: true, default: 0.0 },
  shippingPrice: { type: Number, require: true, default: 0.0 },
  totalPrice: { type: Number, require: true, default: 0.0 },
  isDelivered: { type: Boolean, require: true, default: false },
  deliveredAt: { type: Date },
 },
 { timestamps: true }
);

export const Order = model("Order", orderSchema);

