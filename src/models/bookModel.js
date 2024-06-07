import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema(
    {
        name: {
            type: String
        },
        sub: {
            type: String
        },
        driveId:{
            type: String
        }
    }
)

const BookModel = mongoose.models.book || mongoose.model("book", BookSchema)

export default BookModel