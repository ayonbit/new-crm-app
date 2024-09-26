import mongoose from "mongoose";

const customercatSchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: [true, "Category Name is required"],
      minlength: [3, "Category Name must be at least 3 characters long"],
      maxlength: [20, "Category Name must be at most 20 characters long"],
    },
    Description: {
      type: String,
    },
    Amount: {
      type: Number,
      default: 0,
    },
    AmountOf: {
      type: Number,
      default: 0,
    },

    Type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["Amount", "Percent"],
    },
    Status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const CustomerCategory =
  mongoose.models.CustomerCategory ||
  mongoose.model("CustomerCategory", customercatSchema);

export default CustomerCategory;
