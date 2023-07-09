import { Board, Todo, TypedColumn } from "@/typing";

export const formatTasks = (board: Board) => {
    const tasks = Array.from(board.columns.entries());

    const flatArray = tasks.reduce((map, [key, value]) => {
        map[key] = value.tasks;
        return map;
    }, {} as { [key in TypedColumn]: Todo[] });

    const flatArrayCounted = Object.entries(flatArray).reduce(
        (map, [key, value]) => {
            map[key as TypedColumn] = value.length;
            return map;
        },
        {} as { [key in TypedColumn]: number}
    );

    return flatArrayCounted;
}