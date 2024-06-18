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
    task: {
        type: String,
        required: true,
    },
    timeCreated: {
        type: String,
        required: true,
    },
    agreedPayment: {
        type: Number,
        required: true,
    },
    agreedTime: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
        required: true,
    }
}
    
export default class BookingController {
    static async createBoking(req, res) {
        const {customer, vendor, task, price, time} = req.body;
        try {
            const booking = await createBooking(customer, vendor, task, price, time);
            return res.status(201).json({message: booking});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not create booking", reason: error});
        }
    }

    static async getBookings(req, res) {
        const {customer, vendor} = req.body;
        try {
            const booking = await getBookings(customer, vendor);
            return res.status(200).json(booking);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not get bookings", reason: error});
        }
    }

    static async deleteBooking(req, res) {
        const {id} = req.body;
        try {
            const booking = await deleteBooking(id);
            return res.status(200).json({message: booking});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not delete booking", reason: error});
        }
    }

    static async updateBooking(req, res) {
        const {id, task, price, time} = req.body;
        try {
            const booking = await updateBooking(id, task, price, time);
            return res.status(200).json({message: booking});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not update booking", reason: error});
        }
    }
}