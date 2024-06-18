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
  connection.query("INSERT INTO users (id, customer, vendor, agreedPayment, agreedDate, createdAt) VALUES (?, ?, ?, ?, ?, ?)", [id, customer, vendor, agreedPayment, agreedDate, createdAt], (err, result) => {
    if (err) {
      throw err;
    }
    return result;
  });
}

export const markCompleted = async (id) => {
  connection.query(`UPDATE bookings SET completed = ${true} WHERE id = ${id}`, (err, result) => {
    if (err) {
      throw err;
    }
    return result;
  })
}

export const getBookingsByUserID = async (id) => {
  connection.query("SELECT * FROM bookings WHERE customer = ? OR vendor = ?", [id, id], (err, results) => {
    if (err) {
      throw err;
    }
    return results;
  });
}