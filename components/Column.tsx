"use client";

import { Todo, TypedColumn } from "@/typing";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
  cancelled: "Cancelled"
};

const Column: React.FC<{ id: TypedColumn; tasks: Todo[]; index: number }> = ({
  id,
  tasks,
  index
}) => {
  const [searchVal] = useBoardStore((state) => [state.searchVal]);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`pb-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-semibold text-xl p-4">
                  {idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm">
                    {
                      tasks.filter((task) =>
                        task.title
                          .toLowerCase()
                          .includes(searchVal.toLowerCase())
                      ).length
                    }
                  </span>
                </h2>

                <div className="space-y-4 px-4">
                  {tasks
                    .filter((task) =>
                      task.title.toLowerCase().includes(searchVal.toLowerCase())
                    )
                    .map((task, index) => {
                      return (
                        <Draggable
                          key={task.$id}
                          draggableId={task.$id}
                          index={index}
                        >
                          {(provided) => (
                            <TaskCard
                              task={task}
                              index={index}
                              id={id}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      );
                    })}

                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <button className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
