'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PRIORITY_COLORS, PRIORITY_LABELS } from '@/lib/constants';

export default function TaskCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-grab
        hover:shadow-md transition-shadow duration-200
        ${isDragging ? 'shadow-lg' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-gray-900 text-sm leading-tight">
          {task.title}
        </h3>
        <span className={`
          px-2 py-1 text-xs font-medium rounded-full border
          ${PRIORITY_COLORS[task.priority]}
        `}>
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>
      
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {task.assignee.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-xs text-gray-600">{task.assignee}</span>
        </div>
        <span className="text-xs text-gray-500">
          {formatDate(task.dueDate)}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {task.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
} 