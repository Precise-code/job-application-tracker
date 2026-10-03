import connectDB from "./db";
import {Board , Column} from "./models";
import jobApplication from "./models/job-application";

const DEFAULT_COLUMNS = [
    {
        name: "Wish List", 
        order: 0,
    },
     {
        name: "Applied", 
        order: 1,
    },
     {
        name: "Interviewing", 
        order: 2,
    },
     {
        name: "Offer", 
        order: 3,
    },
     {
        name: "Rejected", 
        order: 4,
    }
]


export async function initializeUserBoard(userId: string) {
    try {
        await connectDB()

        // CHCECK IF BOARD ALREADY EXISTS
        const existingBoard = await Board.findOne({userId, name: "Job Hunt"});

        if (existingBoard) {
            return existingBoard;
        }

        // CREATE THE BOARD
        const board = await Board.create({
            name: "Job Hunt",
            userId,
            columns: []
        })

        // CREATE DEFAULT COLUMNS
        const columns = await Promise.all(DEFAULT_COLUMNS.map((col) => Column.create({
            name: col.name,
            order: col.order,
            boardId: board._id,
            jobApplication: [],
        })));


        // UPDATE THE BOARD WITH THE NEW COLUMNS IDs
        board.columns = columns.map((col) => col._id);
        await board.save();

        return board;
    } catch (err){
        throw err;
    }
}