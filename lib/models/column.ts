import mongoose, {Schema, Document} from "mongoose";

// TYPESCRIPT TYPE TO TELL TYPESRIPT / EDITOR WHAT THE BOARD WOULD LOOK LIKE
export interface IColumn extends Document {
  name: string;
  boardId: mongoose.Types.ObjectId;
  order: number;
  jobApplications: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// This is the runtime blueprint that Mongoose uses to validate and store data in MongoDB. Unlike the interface, it actually runs.
// HERE THE BOARD WOULD HAVE COLUMNS WHICH WOULD HAVE JOB APPLICATIONS
const ColumnSchema = new Schema<IColumn>(
  {
    name: {
      type: String,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    jobApplications: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobApplication",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Column || mongoose.model<IColumn>("Column", ColumnSchema);