import mongoose, { mongo } from "mongoose";

const Elements = mongoose.Schema(
    {
        name: String,
        order: Number,
        attributsObject: Object,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Elements || mongoose.model("Elements", Elements);