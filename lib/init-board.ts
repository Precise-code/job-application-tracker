import "server-only";
import connectDB from "@/lib/db";            // your Mongoose connect helper
import Board from "@/lib/models/board";
import Column from "@/lib/models/column";

// 5 names to match your 5 COLUMN_CONFIG icons/colors
const DEFAULT_COLUMNS = ["Wish List", "Applied", "Interviewing", "Offer", "Rejected"];

export async function getOrCreateBoard(userId: string) {
  await connectDB();

  let board = await Board.findOne({ userId });

  if (!board) {
    board = await Board.create({ name: "Job Hunt", userId, columns: [] });

    const columns = await Column.insertMany(
      DEFAULT_COLUMNS.map((name, order) => ({
        name,
        order,
        boardId: board._id,
        userId,
        jobApplications: [],
      }))
    );

    board.columns = columns.map((c) => c._id);
    await board.save();
  }

  return board;
}