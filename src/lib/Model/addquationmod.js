import mongoose from "mongoose";

const addquationSchema = new mongoose.Schema(
  {
    quotationId: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
      index: true,
    },
    quotes: [
      {
        productName: {
          type: String,
          required: true,
        },
        productPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        productQuantity: {
          type: Number,
          required: true,
          min: 1,
        },
        productSubtotal: {
          type: Number,
          required: true,
          validate: {
            validator: function (value) {
              return value === this.productPrice * this.productQuantity;
            },
            message:
              "Product subtotal must be equal to product price multiplied by product quantity",
          },
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    payable: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          const discountedTotal = this.total - this.discount;
          const taxAmount = (discountedTotal * this.tax) / 100;
          const totalPayable = discountedTotal + taxAmount;
          return value === totalPayable;
        },
        message:
          "Payable amount must be correctly calculated based on total, discount, and tax",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes to frequently queried fields
addquationSchema.index({ customerName: 1 });

const Quotation =
  mongoose.models.Quotation || mongoose.model("Quotation", addquationSchema);

export default Quotation;
