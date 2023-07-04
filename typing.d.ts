import { Models } from "appwrite";

interface Board {
    columns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "inprogress" | "done" | "cancelled";

interface Column {
    id: TypedColumn,
    tasks: Task[];
}

interface Todo extends Models.Document {
    $id: string;
    $createdAt: string;
    title: string;
    status: TypedColumn;
    image?: string;
}

interface Image {
    bucketId: string;
    fileId: string;
}