import mongoose from "mongoose";

const User = mongoose.Schema(
    {
        kindId: String,
        email: String,
        fullName: String,
        firstName: String,
        lastName: String,
        picture: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model("User", User);