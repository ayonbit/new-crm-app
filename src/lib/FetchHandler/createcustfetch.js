"use server";
// Dependencies
import Customer from "../Model/addcusmod";
import { connectToDB } from "../dbcon";

// Fetch customer
export const fetchCustomer = async (q) => {
  try {
    await connectToDB();

    // Create a filter object based on the search query
    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
            { customerCode: { $regex: q, $options: "i" } }, // Include customerCode in the search criteria
          ],
        }
      : {};

    const customer = await Customer.find(filter).lean();
    const serializedCustomer = customer.map((cus) => ({
      ...cus,
      _id: cus._id.toString(),
      createdAt: cus.createdAt ? cus.createdAt.toISOString() : null,
      updatedAt: cus.updatedAt ? cus.updatedAt.toISOString() : null,
    }));

    return serializedCustomer;
  } catch (error) {
    console.error("Error fetching customer:", error.message);
    throw new Error("Failed to fetch customer");
  }
};
