const bookingSchema = {
    id: {
        type: String,
        required: true
    },
    costumer: {
        type: "User",
        required: true,
    },
    vendor: {
        type: "User",
        required: true,
    },
    timeCreated: {
        type: String,
        required: true,
    },
    agreedPayment: {
        type: Number,
        required: true,
    }
}

export default class BookingController {
    
}