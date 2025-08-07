'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

export default function Swimlane({ lane, tasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: lane.id,
  });

  return (
    <div className="flex-1 min-w-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
        {/* Header */}
        <div className={`
          px-4 py-3 border-b ${lane.borderColor} rounded-t-lg
          ${lane.color}
        `}>
          <div className="flex items-center justify-between">
            <h2 className={`font-semibold text-sm ${lane.textColor}`}>
              {lane.title}
            </h2>
            <span className={`
              px-2 py-1 text-xs font-medium rounded-full
              ${lane.color} ${lane.textColor}
            `}>
              {tasks.length}
            </span>
          </div>
        </div>
        
        {/* Task Container */}
        <div
          ref={setNodeRef}
          className={`
            p-4 min-h-[400px] transition-colors duration-200
            ${isOver ? 'bg-blue-50' : 'bg-gray-50'}
          `}
        >
          <SortableContext
            items={tasks.map(task => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-8">
                No tasks
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  );
} 