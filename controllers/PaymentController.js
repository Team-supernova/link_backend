const paymentSchema = {
    id: {
        type: String,
        required: true
    },
    sender: {
        type: "User",
        required: true,
    },
    receiver: {
        type: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },

}

export default class PaymentController {

}