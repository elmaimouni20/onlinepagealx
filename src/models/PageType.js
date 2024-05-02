import mongoose, { mongo } from "mongoose";

const PageType = mongoose.Schema(
    {
        name: String,
        code: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.PageType || mongoose.model("PageType", PageType);