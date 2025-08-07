import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import BoardColumn from './BoardColumn';

const DroppableColumn = ({ column, tasks, onAddTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column
    }
  });

  return (
    <div
      ref={setNodeRef}
      className={`transition-all duration-200 ${
        isOver 
          ? 'ring-2 ring-blue-300 ring-opacity-50' 
          : ''
      }`}
    >
      <BoardColumn
        column={column}
        tasks={tasks}
        onAddTask={onAddTask}
      />
    </div>
  );
};

export default DroppableColumn; 