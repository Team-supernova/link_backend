import { getBookingsByUserID } from "../db/booking";
import { getUserByID } from "../db/user";

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

export class vendorProfileController {
    static async createVendorProfile (req, res) {
        const user_id = req.locals.id;
        const {service, bio, location, website, portfolio1, portfolio2, portfolio3} = req.body;
        try {
            const vendorProfile = await createVendorProfile(service, bio, location, website, portfolio1, portfolio2, portfolio3, user_id);
            return res.status(201).json({message: vendorProfile});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not create vendor profile", reason: error});
        }
    }
    static async getvendorProfile (req, res) {
        const user_id = req.locals.id;
        try {
            const vendorProfile = await getvendorProfile(user_id);
            return res.status(200).json(vendorProfile);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not get vendor profile", reason: error});
        }
    }
    static async updateVendorProfile (req, res) {
        const user_id = req.locals.id;
        const {service, bio, location, website, portfolio1, portfolio2, portfolio3} = req.body;
        try {
            const vendorProfile = await updateVendorProfile(service, bio, location, website, portfolio1, portfolio2, portfolio3, user_id);
            return res.status(200).json({message: vendorProfile});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not update vendor profile", reason: error});
        }
    }
    static async deleteVendorProfile (req, res) {
        const user_id = req.locals.id;
        try {
            const vendorProfile = await deleteVendorProfile(user_id);
            return res.status(200).json({message: vendorProfile});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not delete vendor profile", reason: error});
        }
    }
}

export class userProfileController {
    /**
     * get user's profile
     * @param {} req 
     * @param {*} res 
     */
    static async getUserProfile (req, res) {
        const user_id = req.locals.id;
        try {
            const userProfile = await getUserByID(user_id);
            const bookings = await getBookingsByUserID(user_id);
            userProfile.bookings = bookings;
            return res.status(200).json(userProfile);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not get user profile", reason: error});
        }
    }
    static async updateUserProfile (req, res) {
        const user_id = req.locals.id;
        const {name, email, phone, address, city, state, zip} = req.body;
        try {
            const userProfile = await updateUserProfile(name, email, phone, address, city, state, zip);
            return res.status(200).json({message: userProfile});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Could not update user profile", reason: error});
        }
    }
}