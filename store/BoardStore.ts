import { Board, Column, TypedColumn } from "@/typing";
import { getTasksGroupedByColumn } from "@/utils/getTasksGroupedByColumn";
import { create } from "zustand";

interface BoardState {
    board: Board;
    getBoard: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async() => {
        const board = await getTasksGroupedByColumn();
        set({ board });
    }
}))