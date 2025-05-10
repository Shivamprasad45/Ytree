import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  // address: string;
  email: string;
  // late: number;
  // long: number;
  reason: string;
  mobil_number: number;
  name: string;
  treeType: string;
  // photoUrl: string;
}

const UserSchema = new Schema<IUser>({
  // address: { type: String, required: true },
  email: { type: String, required: true },
  // late: { type: Number, required: true },
  // long: { type: Number, required: true },
  reason: { type: String, required: true },
  mobil_number: { type: Number, required: true },
  name: { type: String, required: true },
  treeType: { type: String, required: true },
  // photoUrl: { type: String, required: true },
});
const User =
  mongoose.models.Free_clam || mongoose.model("Free_clam", UserSchema);

export default User;
