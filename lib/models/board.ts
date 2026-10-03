import mongoose, {Schema, Document} from "mongoose";

// TYPESCRIPT TYPE TO TELL TYPESRIPT / EDITOR WHAT THE BOARD WOULD LOOK LIKE
export interface IBoard extends Document {
    name: string;
    userId: string;
    columns: mongoose.Types.ObjectId[];
    createdAt: Date;
    updated: Date; 
}

// This is the runtime blueprint that Mongoose uses to validate and store data in MongoDB. Unlike the interface, it actually runs.
const BoardSchema = new Schema <IBoard> ({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        index: true,
    },
    columns: [
        {
            type: Schema.Types.ObjectId,
            ref: "Column",
        }
    ]
},
{
    timestamps: true,
}
);


export default mongoose.models.Board || mongoose.model<IBoard>("Board" , BoardSchema);