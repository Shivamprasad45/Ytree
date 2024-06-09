import mongoose, { Schema } from "mongoose";

const SignupSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotpasswordToken: String,
  forgotpasswordTokenExpiry: Date,
});

const Signup = mongoose.models.Users || mongoose.model("Users", SignupSchema);

export default Signup;
