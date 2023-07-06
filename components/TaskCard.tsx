"use client";

import { Todo } from "@/typing";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps
} from "react-beautiful-dnd";

interface Props {
  task: Todo;
  index: number;
  id: string;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TaskCard = ({
  task,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps
}: Props) => {
  return (
    <div
      className="bg-white rounded-2xl space-y-2 drop-shadow-md p-4 flex flex-row items-center justify-between"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <p className="text-md">{task.title}</p>
      <button className="text-red-500 hover:text-red-600">
        <XCircleIcon className="ml-5 h-8 w-8" />
      </button>

      {/** Add image here */}
    </div>
  );
};

export default TaskCard;
