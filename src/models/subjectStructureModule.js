import mongoose, { Schema } from "mongoose";

const structureSchema = new Schema(
    {
        sub: {
            type: String,
            required: [true, "SubjectId is required"]
        },
        structure:{
            type: String
            // JSON.stringy(array of modulesId and names ?)
        }
    }
)

const SubjectStructureModel = mongoose.models.subjectstructures || new mongoose.model("subjectstructure", structureSchema)

export default SubjectStructureModel