import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: [true, "Supplier name is required"],
      minlength: [3, "Supplier name must be at least 3 characters long"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      minlength: [3, "Company name must be at least 3 characters long"],
    },
    companyEmail: {
      type: String,
    },
    companyPhone: {
      type: String,
      required: [true, "Company phone is required"],
    },
    companyAddress: {
      type: String,
    },
    openingBalance: {
      type: Number,
      min: [0, "Opening balance must be at least 0"],
      required: [true, "Opening balance is required"],
    },
    companyCode: {
      type: String,
      required: true,
      unique: true,
    },
  },

  {
    timestamps: true,
  }
);

const Supplier =
  mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema);

export default Supplier;
