import mongoose, { mongo } from "mongoose";

const Page = mongoose.Schema(
    {
        name: String,
        pageSlug: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        descrition: String,
        elementsList:[mongoose.SchemaTypes.ObjectId],
        pageType:mongoose.SchemaTypes.ObjectId,
        owner:mongoose.SchemaTypes.ObjectId,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Page || mongoose.model("Page", Page);