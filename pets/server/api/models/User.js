import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        // used in place of username
        type: String,
        required: true,
        unique: true
    },
    password: {
        // user's encrypted password (bcrypt hash)
        type: String,
        required: true
    },
});

// encrypt password before saving
userSchema.pre('save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

// match user's password using bcrypt
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

const User = mongoose.model("user", userSchema, "users");

export default User;