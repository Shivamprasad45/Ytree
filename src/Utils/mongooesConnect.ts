import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Mongoose already connected");
      return;
    }

    await mongoose.connect(
      "mongodb+srv://shivamGond:Mmfdv2UuHK9LVAjS@cluster0.y7agcqc.mongodb.net/Trees"
    );
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error);
  }
};

export default DbConnect;
