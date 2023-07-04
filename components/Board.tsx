import { useBoardStore } from "@/store/BoardStore";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Board() {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard
  ]);

  React.useEffect(() => {
    getBoard();
  }, [getBoard]);

  console.log(board);
  return (
    <h1>Board</h1>
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div></div>}
    //   </Droppable>
    // </DragDropContext>
  );
}

export default Board;