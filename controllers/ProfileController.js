const vendorProfileSchema = {
    id: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
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

    }
    static async vendorProfile (req, res) {

    }
    static async updateVendorProfile (req, res) {

    }
    static async deleteVendorProfile (req, res) {

    }
}

export class userProfileController {
    /**
     * get user's profile
     * @param {} req 
     * @param {*} res 
     */
    static async userProfile (req, res) {

    }
    static async updateUserProfile (req, res) {

    }
    static async deleteUserProfile (req, res) {

    }
}