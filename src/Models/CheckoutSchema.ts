import mongoose, { Schema } from "mongoose";
import { cartSchema } from "./Cartmodel";
const addressSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Invalid email address"],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});
const plantOrderSchema = new Schema({
  Addresss: { type: addressSchema, required: true },
  Orderid: { type: String, required: true },
  plants: { type: [cartSchema], required: true },
  User_name: { type: String, required: true },
});
const Order =
  mongoose.models.Order || mongoose.model("Order", plantOrderSchema);

export default Order;
