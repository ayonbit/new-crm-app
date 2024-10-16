"use server";
// Dependencies
import validator from "validator";
import { connectToDB } from "../dbcon";
import Customer from "../Model/addcusmod";
import CustomerCategory from "../Model/cuscatmod";

// Create customer
export const CreateCustomerHandler = async (formData) => {
  const {
    name,
    email,
    phone,
    address,
    category, // This now contains the category name
    openingBalance,
    dueLimit,
    Status,
    setDefault,
  } = formData;

  try {
    // Sanitize inputs
    //const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedPhone = validator.trim(phone);
    //const sanitizedAddress = validator.escape(address);
    const sanitizedStatus = validator.escape(validator.trim(Status));
    // Connect to the database
    await connectToDB();

    // Validation
    const existingCustomer = await Customer.findOne({ phone: sanitizedPhone });
    if (existingCustomer) {
      return { success: false, message: "Customer already exists" };
    }

    // Fetch the category document using the category name
    const categoryDoc = await CustomerCategory.findOne({
      CategoryName: category,
    });
    if (!categoryDoc) {
      return { success: false, message: "Invalid category" };
    }

    // Validate setDefault
    if (setDefault !== "true" && setDefault !== "false") {
      return { success: false, message: "Invalid value for setDefault" };
    }

    // Generate customerId
    const lastCustomer = await Customer.findOne().sort({ createdAt: -1 });
    let newCustomerCode = "CUS#001";
    if (lastCustomer && lastCustomer.customerCode) {
      const lastCode = parseInt(lastCustomer.customerCode.split("#")[1], 10);
      const newCode = lastCode + 1;
      newCustomerCode = `CUS#${newCode.toString().padStart(3, "0")}`;
    }

    // Save the category name
    const newCustomer = new Customer({
      customerCode: newCustomerCode,
      name,
      email,
      phone: sanitizedPhone,
      address,
      category: categoryDoc.CategoryName, // Save the category name
      openingBalance,
      dueLimit,
      Status: sanitizedStatus,
      setDefault, // Store setDefault as a string
    });

    // Save the new customer
    await newCustomer.save();

    return { success: true, message: "Customer created successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
//Update customer
export const updateCustomerHandler = async (formData) => {
  const {
    id,
    name,
    email,
    phone,
    address,
    category,
    openingBalance,
    dueLimit,
    Status,
    setDefault,
  } = formData;

  try {
    // Sanitize inputs
    const sanitizedPhone = validator.trim(phone);
    const sanitizedStatus = validator.escape(validator.trim(Status));
    await connectToDB();

    // Fetch the customer document
    const customer = await Customer.findById(id);
    if (!customer) {
      return { success: false, message: "Customer not found" };
    }

    // Fetch the category document using the category name
    const categoryDoc = await CustomerCategory.findOne({
      CategoryName: category,
    });
    if (!categoryDoc) {
      return { success: false, message: "Invalid category" };
    }

    // Validate setDefault
    if (setDefault !== "true" && setDefault !== "false") {
      return { success: false, message: "Invalid value for setDefault" };
    }

    // Update the customer
    customer.name = name;
    customer.email = email;
    customer.phone = sanitizedPhone;
    customer.address = address;
    customer.category = categoryDoc.CategoryName;
    customer.openingBalance = openingBalance;
    customer.dueLimit = dueLimit;
    customer.Status = sanitizedStatus;
    customer.setDefault = setDefault;

    // Save the updated customer
    await customer.save();

    return { success: true, message: "Customer updated successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
//Delete customer
export const deleteCustomerHandler = async (id) => {
  try {
    await connectToDB();
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return { success: false, message: "Customer not found" };
    }
    return { success: true, message: "Customer deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
