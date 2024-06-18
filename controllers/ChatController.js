import { createChat, deleteChat, getChats, updateChat } from '../db/chat';


/**
 * @class ChatController - Controller for chat routes
 * 
 */


export default class ChatController {
    static async getChats(req, res) {
        const { sender, receiver } = req.body;
        try {
            const chat = getChats(sender, receiver);
            return res.status(200).json(chat);    
        } catch (error) {
            return res.status(500).json({error: "Could not get chats", reason: error});
        }
    }
    static async createChat(req, res) {
        const { message, sender, receiver } = req.body;
        try {
            const msg = await createChat(message, sender, receiver);
            return res.status(201).json({message: msg});    
        } catch (error) {
            return res.status(500).json({error: "Could not create chat", reason: error});
        }
    }
    static async deleteChat(req, res) {
        const { id } = req.body;
        try {
            const del = await deleteChat(id);
            return res.status(200).json({message: del});    
        } catch (error) {
            return res.status(500).json({error: "Could not delete chat", reason: error});
        }
        
    }
    static async updateChat(req, res) {
        const { id, message } = req.body;
        try {
            const update = await updateChat(id, message);
            return res.status(200).json({message: update});
        } catch (error) {
            return res.status(500).json({error: "Could not update chat", reason: error});
        }
    }
}