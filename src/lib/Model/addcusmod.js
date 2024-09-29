import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    address: {
      type: String,
    },
    category: {
      type: String, // Store the category name as a string
      required: [true, "Customer category is required"],
    },
    openingBalance: {
      type: Number,
      min: [0, "Opening balance must be at least 0"],
      required: [true, "Opening balance is required"],
    },
    dueLimit: {
      type: Number,
      min: [0, "Due limit must be at least 0"],
      required: [true, "Due limit is required"],
    },
    Status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
    },
    setDefault: {
      type: String,
      enum: ["true", "false"],
      required: [true, "Set Default is required"],
    },
    customerCode: { 
      type: String, 
      required: true, 
      unique: true },
  },
  {
    timestamps: true,
  }
);

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
