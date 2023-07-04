import  {databases} from "@/appwrite";
import { Board, Column, TypedColumn } from "@/typing";

export const getTasksGroupedByColumn = async() => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TASK_COLLECTION_ID!
    )
    const tasks = data.documents;
    const columns = tasks.reduce((acc, task) => {
        if (!acc.get(task.status)) {
            acc.set(task.status, {
                id: task.status,
                tasks: []
            })
        }

        acc.get(task.status)!.tasks.push({
            $id: task.$id,
            $createdAt: task.$createdAt,
            title: task.title,
            status: task.status,
            ...(task.image && { image: JSON.parse(task.image)})
        })
        return acc;
    }, new Map<TypedColumn, Column>());

    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done", "cancelled"];
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                tasks: []
            })
        }
    }

    console.log(columns);

    // sort columns of status
    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        ))
    );

    const board: Board = {
        columns: sortedColumns
    }
    return board;
}

