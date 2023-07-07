"use client";

import { useBoardStore } from "@/store/BoardStore";
import React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { Column as ColumnType } from "@/typing";

function Board() {
  const [board, getBoard, setBoardState, updateTaskInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTasksInDB
    ]
  );

  React.useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log(destination, source, type);
    if (!destination) return;

    // Handle column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);

      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns
      });
    }

    // Handle task card drag
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol: ColumnType = {
      id: startColIndex[0],
      tasks: startColIndex[1].tasks
    };

    const finishCol: ColumnType = {
      id: finishColIndex[0],
      tasks: finishColIndex[1].tasks
    };

    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol === finishCol) return;

    const newTasks = startCol.tasks;
    const [taskMoved] = newTasks.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTasks.splice(destination.index, 0, taskMoved);
      const newCol = {
        id: startCol.id,
        tasks: newTasks
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns });
    } else {
      // drag to another column
      const finishTasks = Array.from(finishCol.tasks);
      finishTasks.splice(destination.index, 0, taskMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        tasks: newTasks
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        tasks: finishTasks
      });

      updateTaskInDB(taskMoved, finishCol.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };

  console.log(board);
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} tasks={column.tasks} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
