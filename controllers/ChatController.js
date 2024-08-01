import { deleteChat, getChats, storeChat, editChat as updateChat } from '../db/chat.js';
import { combineUserAndGetRoom, createPreview, getAllRoom, getUserPreviews } from '../db/preview.js';
import { generateID } from '../utils/index.js';

/**
 * @class ChatController - Controller for chat routes
 * 
 */

export default class ChatController {

    /**
     * Gets all the chats in a chat room
     * @param {string} room chat room
     * @returns all chats in a room
     */
    static async getChats(room) {
        try {
            const chats = await getChats(room);
            return chats;
        } catch (error) {
            return {message: "Could not get chat", reason: error};
        }
    }
    static async createChat(id, sender, receiver, message, imageURI, room) {
        try {
            const msg = await storeChat(id, sender, receiver, message, imageURI, room);
            return msg;
        } catch (error) {
            return {message: "Could not get chat", reason: error};
        }
    }
    static async makeChat(req, res) {
        const { id, sender, receiver, message, imageURI, room } = req.body;
        try {
            const msg = await storeChat(id, sender, receiver, message, imageURI, room);
            return res.status(201).json({message: msg});
        } catch (error) {
            return {message: "Could not get chat", reason: error};
        }
    }
    static async deleteChat(req, res) {
        const { id } = req.body;
        try {
            const del = await deleteChat(id);
            return res.status(200).json({message: del});    
        } catch (error) {
            return {message: "Could not get chat", reason: error};
        }
        
    }
    static async updateChat(id, message) {
        try {
            const update = await updateChat(id, message);
            return res.status(200).json({message: update});
        } catch (error) {
            return {message: "Could not get chat", reason: error};
        }
    }

    static async check(req, res) {
        const { sender, receiver } = req.body;
        if (!sender || !receiver) return;
        try {
            const result = await combineUserAndGetRoom(sender, receiver);
            return res.status(200).json({room: result});
        } catch (err) {
            console.error(err);
        }
    }

    static async getRoom(req, res) {
        const { sender, receiver } = req.body;
        if (!sender || !receiver) return;
        try {
            const result = await combineUserAndGetRoom(sender, receiver);
            if (result) return res.status(200).json({message: "Successfully collected room", room: result});
            const room = generateID();
            try {
                await createPreview(sender, receiver, room);
                return res.status(201).json({message: "Successfully created room", room});
            } catch (error) {
                res.status(500).json({message: "Could not get room and could not create one", reason: error});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Could not get room and could not create one", reason: error});
        }
    }

    static async getPreviews(req, res) {
        const { user } = req.body;
        try {
            const previews = await getUserPreviews(user);
            return res.status(200).json({previews});
        } catch (error) {
            res.status(500).json({message: "Could not get previews", reason: error});
        }
    }
    static async getAllPreviews(req, res) {
        const { user } = req.body;
        try {
            const previews = await getAllRoom();
            return res.status(200).json({previews});
        } catch (error) {
            res.status(500).json({message: "Could not get previews", reason: error});
        }
    }
}
