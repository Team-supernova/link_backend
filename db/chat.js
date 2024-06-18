import connection from "."
import { generateID } from "../utils"

const chatSchema = {
    id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}

export const createChat = async (message, sender, receiver) => {
    const id = generateID();
    const timestamp = new Date().toLocaleString();
    connection.query(`INSERT INTO chats (id, message, sender, receiver, timestamp) VALUES (${id}, ${message}, ${sender}, ${receiver}, ${timestamp})`, (err, result) => {
        if (err) throw err;
        return result;
    })
}

export const getChats = async (sender, receiver) => {
    connection.query(`SELECT * FROM chats WHERE sender = ${sender} AND receiver = ${receiver}`, (err, result) => {
        if (err) throw err;
        return result;
    })
}

export const deleteChat = async (id) => {
    connection.query(`DELETE FROM chats WHERE id = ${id}`, (err, result) => {
        if (err) throw err;
        return result;
    })
}

export const updateChat = async (id, message) => {
    connection.query(`UPDATE chats SET message = ${message} WHERE id = ${id}`, (err, result) => {
        if (err) throw err;
        return result;
    });
}
