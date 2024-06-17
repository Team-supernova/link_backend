import connection from ".";
import { generateID } from "../utils";

export const getBookingByID = async (id) => {
  connection.query("SELECT * FROM bookings WHERE id = ?", [id], (err, results) => {
    if (err) {
      throw err;
    }
    return results[0];
  });
}

export const createBooking = async (customer, vendor, agreedPayment, agreedDate) => {
  const id = generateID();
  const createdAt = new Date().toLocaleString();
  connection.query("INSERT INTO users (id, customer, vendor, agreedPayment, agreedDate, createdAt) VALUES (?, ?, ?, ?, ?, ?)", [id, customer, vendor, agreedPayment, agreedDate, createdAt], (err) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    return res.status(201).send("User created");
  });
}

export const getUserByID = async (id) => {
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      throw err;
    }
    return results[0];
  });
}