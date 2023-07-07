import { databases } from "@/appwrite";
import { Board, Column, Todo, TypedColumn } from "@/typing";
import { getTasksGroupedByColumn } from "@/utils/getTasksGroupedByColumn";
import { create } from "zustand";

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTasksInDB: (task: Todo, columnID: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async() => {
        const board = await getTasksGroupedByColumn();
        set({ board });
    },
    setBoardState: (board) => set({ board }),
    updateTasksInDB: async (task: Todo, columnId: TypedColumn) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TASK_COLLECTION_ID!,
            task.$id,
            {
                title: task.title,
                status: columnId
            }
        )
    }
}))