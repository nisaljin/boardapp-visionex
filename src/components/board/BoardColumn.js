import React from 'react';
import Image from 'next/image';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const BoardColumn = ({ column, tasks, onAddTask }) => {
  // Function to get column color based on title
  const getColumnColor = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('in progress')) {
      return '#FFA800';
    } else if (lowerTitle.includes('approved')) {
      return '#AEE753';
    } else if (lowerTitle.includes('reject')) {
      return '#F90430';
    }
    return '#F3F4F6'; // Default gray color
  };

  const columnColor = getColumnColor(column.title);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 mt-3 px-4 sm:px-6 flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Column Title Button */}
          <button 
            className="hover:opacity-80 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-all"
            style={{ 
              backgroundColor: columnColor,
              color: columnColor === '#F90430' ? 'white' : '#374151' // White text for rejected (red background)
            }}
          >
            {column.title}
          </button>
          
          {/* Task Count */}
          <span 
            className="text-xs text-gray-500 bg-gray-200 px-2 py-1"
            style={{ borderRadius: '46px' }}
          >
            {tasks.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Add Task Button */}
          <button 
            onClick={() => onAddTask(column.id)}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Image 
              src="/assets/icons/Plus 2.png" 
              alt="Add Task" 
              width={16} 
              height={16}
              className="opacity-60 hover:opacity-100"
            />
          </button>
          
          {/* Options Menu */}
          <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors">
            <Image 
              src="/assets/icons/Dots.png" 
              alt="Options" 
              width={14} 
              height={14}
              className="opacity-60 hover:opacity-100"
            />
          </button>
        </div>
      </div>
      
      {/* Separator between header and tasks */}
      <div className="border-t border-gray-200 mb-3 flex-shrink-0"></div>
      
      {/* Tasks Container with gray background starting from separator */}
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50 -mt-3">
          <div className="space-y-3 pb-4 px-4 sm:px-6 pt-3">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                isHighlighted={task.isHighlighted}
              />
            ))}
            
            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="flex items-center justify-center h-24 sm:h-32 text-gray-400">
                <div className="text-center">
                  <Image 
                    src="/assets/icons/Plus 2.png" 
                    alt="Add Task" 
                    width={24} 
                    height={24}
                    className="mx-auto mb-2 opacity-40"
                  />
                  <p className="text-sm">No tasks yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardColumn; 