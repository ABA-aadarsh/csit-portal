import mongoose, { Schema } from "mongoose";

const ModuleSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        sub: {
            type: String,
            required: [true, "SubjectId is required"]
        },
        lesson:{
            type: String,
            required: [true, "LessonId is required"]
        },
        content: String,
        slug: String
    }
)

const ModuleModel = mongoose.models.section || mongoose.model("section", ModuleSchema)

export default ModuleModel