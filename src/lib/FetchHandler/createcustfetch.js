"use server";
//Dependencies
import Customer from "../Model/addcusmod";
import { connectToDB } from "../dbcon";

//Fetch customer
export const fetchCustomer = async () => {
  try {
    await connectToDB();
    const customer = await Customer.find({}).lean();
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
