import connection from "./db.js";
import { generateID } from "../utils/index.js";




export const createVendorProfile = async(service, bio, location, website, portfolio1, portfolio2, portfolio3, user_id) => {
    const id = generateID();
    connection.query(`UPDATE users SET role = 'vendor' WHERE id = ${user_id}`, (err) => {
        if (err) throw err;
    });
    connection.query(`INSERT INTO profiles (id, user_id, service, bio, location, website, portfolio1, portfolio2, portfolio3) VALUES (${id}, ${user_id}, ${service}, ${bio}, ${location}, ${website}, ${portfolio1}, ${portfolio2}, ${portfolio3})`, (err, result) => {
        if (err) throw err;
        return result;
    })
}

export const getvendorProfile = async(user_id) => {
    connection.query(`SELECT * FROM profiles WHERE user_id = ${user_id}`, (err, result) => {
        if (err) throw err;
        return result;
    })
}

export const updateVendorProfile = async(service, bio, location, website, portfolio1, portfolio2, portfolio3, user_id) => {
    connection.query(`UPDATE profiles SET service = ${service}, bio = ${bio}, location = ${location}, website = ${website}, portfolio1 = ${portfolio1}, portfolio2 = ${portfolio2}, portfolio3 = ${portfolio3} WHERE user_id = ${user_id}`, (err, result) => {
        if (err) throw err;
        return result;
    })
}

export const deleteVendorProfile = async(user_id) => {
    connection.query(`DELETE FROM profiles WHERE user_id = ${user_id}`, (err, result) => {
        if (err) throw err;
        return result;
    })
}