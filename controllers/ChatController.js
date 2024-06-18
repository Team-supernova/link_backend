/**
 * @class ChatController - Controller for chat routes
 * 
 */

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

export default class ChatController {

}