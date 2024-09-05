import mongoose, { Schema, Document } from "mongoose";

// Define the TypeScript interface for the Contact form data
interface IContactForm extends Document {
  name: string;
  email: string;
  message: string;
}

// Create the Mongoose schema
const ContactFormSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Mongoose model
const ContactForm =
  mongoose.models.ContactForm ||
  mongoose.model<IContactForm>("ContactForm", ContactFormSchema);

export default ContactForm;
