import connection from ".";
import { generateID } from "../utils";

const vendorProfileSchema = {
    id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        ref: 'User',
        required: true
    },
    service: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    portfolio1: {
        type: String,
    },
    portfolio2: {
        type: String,
    },
    portfolio3: {
        type: String,
    }
}



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