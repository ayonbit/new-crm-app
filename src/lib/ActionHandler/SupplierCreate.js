"use server";
// Dependencies
import validator from "validator";
import { connectToDB } from "../dbcon";
import Supplier from "../Model/AddSupplierModel";

// Create Supplier
export const CreateSupplierHandler = async (formData) => {
  const {
    supplierName,
    companyName,
    companyEmail,
    companyPhone,
    companyAddress,
    openingBalance,
  } = formData;

  try {
    // Sanitize inputs
    const sanitizedSupplierName = validator.trim(supplierName);
    const sanitizedCompanyName = validator.trim(companyName);
    const sanitizedCompanyEmail = validator.trim(companyEmail);
    const sanitizedCompanyPhone = validator.trim(companyPhone);
    const sanitizedCompanyAddress = validator.trim(companyAddress);
    const sanitizedOpeningBalance = validator.toFloat(
      openingBalance.toString()
    );

    // Connect to the database
    await connectToDB();

    // Validation
    const existingSupplier = await Supplier.findOne({
      companyPhone: sanitizedCompanyPhone,
    });
    if (existingSupplier) {
      return { success: false, message: "Supplier already exists" };
    }

    // Generate supplierCode
    const lastSupplier = await Supplier.findOne().sort({ createdAt: -1 });
    let newSupplierCode = "SUP#001";
    if (lastSupplier && lastSupplier.companyCode) {
      const lastCode = parseInt(lastSupplier.companyCode.split("#")[1], 10);
      const newCode = lastCode + 1;
      newSupplierCode = `SUP#${newCode.toString().padStart(3, "0")}`;
    }

    // Save the supplier
    const newSupplier = new Supplier({
      supplierName: sanitizedSupplierName,
      companyName: sanitizedCompanyName,
      companyEmail: sanitizedCompanyEmail,
      companyPhone: sanitizedCompanyPhone,
      companyAddress: sanitizedCompanyAddress,
      openingBalance: sanitizedOpeningBalance,
      companyCode: newSupplierCode,
    });
    await newSupplier.save();
    return { success: true, message: "Supplier created successfully" };
  } catch (error) {
    console.error("Error Creating Supplier:", error.message);
    return { success: false, message: error.message };
  }
};
// Update Supplier
export const updateSupplierHandler = async (id, formData) => {
  const {
    supplierName,
    companyName,
    companyEmail,
    companyPhone,
    companyAddress,
    openingBalance,
  } = formData;

  try {
    // Sanitize inputs
    const sanitizedSupplierName = validator.trim(supplierName);
    const sanitizedCompanyName = validator.trim(companyName);
    const sanitizedCompanyEmail = validator.trim(companyEmail);
    const sanitizedCompanyPhone = validator.trim(companyPhone);
    const sanitizedCompanyAddress = validator.trim(companyAddress);
    const sanitizedOpeningBalance = validator.toFloat(
      openingBalance.toString()
    );

    // Connect to the database
    await connectToDB();

    // Validation
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return { success: false, message: "Supplier not found" };
    }

    // Update the supplier
    supplier.supplierName = sanitizedSupplierName;
    supplier.companyName = sanitizedCompanyName;
    supplier.companyEmail = sanitizedCompanyEmail;
    supplier.companyPhone = sanitizedCompanyPhone;
    supplier.companyAddress = sanitizedCompanyAddress;
    supplier.openingBalance = sanitizedOpeningBalance;

    await supplier.save();

    return { success: true, message: "Supplier updated successfully" };
  } catch (error) {
    console.error("Error Updating Supplier:", error.message);
    return { success: false, message: error.message };
  }
};
// Delete Supplier
export const deleteSupplierHandler = async (id) => {
  try {
    await connectToDB();

    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
      return { success: false, message: "Supplier not found" };
    }
    return { success: true, message: "Supplier deleted successfully" };
  } catch (error) {
    console.error("Error Deleting Supplier:", error.message);
    return { success: false, message: error.message };
  }
};
