"use server";
// Dependencies
import Customer from "../Model/addcusmod";
import { connectToDB } from "../dbcon";

//Fetch customer data
export const fetchCustomer = async (q, page = 1, limit = 10) => {
  try {
    await connectToDB();

    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
            { customerCode: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const totalCustomers = await Customer.countDocuments(filter);
    const totalPages = Math.ceil(totalCustomers / limit);

    const customers = await Customer.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const serializedCustomers = customers.map((cus) => ({
      ...cus,
      _id: cus._id.toString(),
      createdAt: cus.createdAt ? cus.createdAt.toISOString() : null,
      updatedAt: cus.updatedAt ? cus.updatedAt.toISOString() : null,
    }));

    return { customers: serializedCustomers, totalPages };
  } catch (error) {
    console.error("Error fetching customers:", error.message);
    throw new Error(
      "Unable to retrieve customer data. Please try again later."
    );
  }
};

//Fetch single customer data
export const fetchSingleCustomer = async (id) => {
  try {
    await connectToDB();

    const customer = await Customer.findById(id).lean();
    if (!customer) {
      throw new Error("Customer not found");
    }
    //console.log("Fetched customer:", customer); // Log fetched customer
    return {
      ...customer,
      _id: customer._id.toString(), // Convert ObjectId to string
      createdAt: customer.createdAt ? customer.createdAt.toISOString() : null, // Convert Date to ISO string
      updatedAt: customer.updatedAt ? customer.updatedAt.toISOString() : null,
    };
  } catch (error) {
    console.error("Error fetching customer:", error.message);
    throw new Error("Failed to fetch  customer data");
  }
};
