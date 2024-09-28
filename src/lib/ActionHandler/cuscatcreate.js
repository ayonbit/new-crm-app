"use server";
// Dependencies
import validator from "validator";
import CustomerCategory from "../Model/cuscatmod";
import { connectToDB } from "../dbcon";

// Create customer category
export const CreateCategoryHandler = async (formData) => {
  const { CategoryName, Description, Amount, AmountOf, Type, Status } =
    formData;

  try {
    // Sanitize inputs
    const sanitizedCategoryName = validator.escape(
      validator.trim(CategoryName)
    );
    const sanitizedDescription = validator.escape(validator.trim(Description));
    const sanitizedAmount = validator.toFloat(Amount.toString());
    const sanitizedAmountOf = validator.escape(
      validator.trim(AmountOf.toString())
    );
    const sanitizedType = validator.escape(validator.trim(Type));
    const sanitizedStatus = validator.escape(validator.trim(Status));

    // Connect to the database
    await connectToDB();

    // Validation
    const existingCategory = await CustomerCategory.findOne({
      CategoryName: sanitizedCategoryName,
    });
    if (existingCategory) {
      return { success: false, message: "Category already exists" };
    }
    const newCategory = new CustomerCategory({
      CategoryName: sanitizedCategoryName,
      Description: sanitizedDescription,
      Amount: sanitizedAmount,
      AmountOf: sanitizedAmountOf,
      Type: sanitizedType,
      Status: sanitizedStatus,
    });

    // Save the new category
    await newCategory.save();

    return { success: true, message: "Category created successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
