"use server";
// Dependencies
import validator from "validator";
import Quotation from "../Model/addquationmod";
import { connectToDB } from "../dbcon";

// Helper function to sanitize quotes
const sanitizeQuote = (quote) => {
  if (
    !quote.productName ||
    !quote.productPrice ||
    !quote.productQuantity ||
    !quote.productSubtotal
  ) {
    throw new Error(
      "Missing required quote fields: productName, productPrice, productQuantity, or productSubtotal"
    );
  }

  return {
    productName: validator.escape(validator.trim(quote.productName)),
    productPrice: validator.toFloat(quote.productPrice.toString()),
    productQuantity: validator.toInt(quote.productQuantity.toString()),
    productSubtotal: validator.toFloat(quote.productSubtotal.toString()),
  };
};

// Create quotation
export const CreateQuotationHandler = async (formData) => {
  const { customerName, quotes, total, discount, tax, payable } = formData;

  // Validate required fields
  if (!customerName || !quotes || !total || !payable) {
    console.error("Missing required fields");
    return {
      success: false,
      message:
        "Missing required fields: customerName, quotes, total, or payable",
    };
  }

  try {
    // Sanitize inputs
    const sanitizedCustomerName = validator.escape(
      validator.trim(customerName)
    );
    const sanitizedQuotes = quotes.map(sanitizeQuote);

    const sanitizedTotal = validator.toFloat(total.toString());
    const sanitizedDiscount = discount
      ? validator.toFloat(discount.toString())
      : 0;
    const sanitizedTax = tax ? validator.toFloat(tax.toString()) : 0;
    const sanitizedPayable = validator.toFloat(payable.toString());

    // Validate numeric fields
    if (
      sanitizedTotal < 0 ||
      sanitizedDiscount < 0 ||
      sanitizedTax < 0 ||
      sanitizedPayable < 0
    ) {
      throw new Error(
        "Total, discount, tax, and payable amounts must be positive numbers"
      );
    }

    // Connect to the database
    await connectToDB();

    // Generate a unique quotationId
    const lastQuotation = await Quotation.findOne().sort({ createdAt: -1 });
    let newQuotationId = "QUO#001";
    if (lastQuotation && lastQuotation.quotationId) {
      const lastCode = parseInt(lastQuotation.quotationId.split("#")[1], 10);
      const newCode = lastCode + 1;
      newQuotationId = `QUO#${newCode.toString().padStart(3, "0")}`;
    }

    // Create a new quotation
    const newQuotation = new Quotation({
      quotationId: newQuotationId, // Add the generated quotationId
      customerName: sanitizedCustomerName,
      quotes: sanitizedQuotes,
      total: sanitizedTotal,
      discount: sanitizedDiscount,
      tax: sanitizedTax,
      payable: sanitizedPayable,
    });

    // Save the new quotation
    const savedQuotation = await newQuotation.save();

    return { success: true, message: "Quotation created successfully" };
  } catch (error) {
    console.error("Error creating quotation:", error);
    return { success: false, message: error.message };
  }
};
