import React from 'react';
import Image from 'next/image';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, isHighlighted = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: {
      type: 'task',
      task
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority) => {
    return '#B1B5C3';
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Low';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'Stream':
        return '/assets/icons/Flash.png';
      case 'Group Call':
        return '/assets/icons/Bell.png';
      default:
        return null;
    }
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
        isDragging ? 'shadow-lg' : ''
      } w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] ${
        task.hasAttachment ? 'min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[240px]' : 'min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px]'
      } flex flex-col`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        {/* Category and Title */}
        <div className="flex-1">
          {/* Category */}
          <div className="flex items-center space-x-2 mb-1">
            <div className={`w-2 h-2 rounded ${task.categoryColor}`}></div>
            <span className="text-sm text-gray-500 capitalize">{task.category}</span>
          </div>
          
          {/* Task Title */}
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-tight line-clamp-2">
            {task.title}
          </h3>
        </div>
        
        {/* Options Menu */}
        <div className="w-4 h-4 flex items-center justify-center ml-2 flex-shrink-0">
          <Image 
            src="/assets/icons/Dots.png" 
            alt="Options" 
            width={12} 
            height={12}
            className="opacity-60 hover:opacity-100 cursor-pointer"
          />
        </div>
      </div>

      {/* Card Content - Flex to push bottom content down */}
      <div className="flex flex-col flex-1">
        {/* Top Content */}
        <div className="space-y-2 sm:space-y-3">
          {/* Assignees and Priority Row */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Assignees */}
            <div className="flex items-center">
              {/* User 1 */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full border border-white flex items-center justify-center relative z-0 overflow-hidden">
                <Image 
                  src="/assets/icons/assigneduser.png" 
                  alt="Assignee 1" 
                  width={20} 
                  height={20}
                  className="object-cover"
                />
              </div>
              
              {/* User 2 (if more than 1 assignee) */}
              {task.assignees > 1 && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full border border-white flex items-center justify-center relative -ml-2 z-10 overflow-hidden">
                  <Image 
                    src="/assets/icons/assigneduser.png" 
                    alt="Assignee 2" 
                    width={20} 
                    height={20}
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* +X More (if more than 2 assignees) */}
              {task.assignees > 2 && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded-full border border-white flex items-center justify-center relative -ml-2 z-20">
                  <span className="text-xs text-gray-600 font-semibold">+{task.assignees - 2}</span>
                </div>
              )}
            </div>
            
            {/* Priority */}
            <div 
              className="flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
              style={{ backgroundColor: '#F4F5F6' }}
            >
              <Image 
                src="/assets/icons/Flash.png" 
                alt="Priority" 
                width={10} 
                height={10}
                style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(8%) saturate(1037%) hue-rotate(202deg) brightness(89%) contrast(86%)' }}
              />
              <span 
                className="text-sm font-medium"
                style={{ color: '#B1B5C3' }}
              >
                {getPriorityText(task.priority)}
              </span>
            </div>
          </div>

          {/* Attachment Area */}
          {task.hasAttachment && (
            <div className="w-full bg-gray-300 rounded-md overflow-hidden h-16 sm:h-18 md:h-20 lg:h-24">
              <Image 
                src="/assets/icons/imageplaceholder.png" 
                alt="Attachment" 
                width={234} 
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Spacer to push bottom content down */}
        <div className="flex-1"></div>

        {/* Bottom Content - Always at bottom */}
        <div className="mt-auto">
          {/* Divider */}
          <div className="border-t border-gray-200 mb-3"></div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Links */}
              {task.links > 0 && (
                <div className="flex items-center space-x-1">
                  <Image 
                    src="/assets/icons/link.png" 
                    alt="Links" 
                    width={16} 
                    height={16}
                    className="opacity-60"
                  />
                  <span className="text-sm text-gray-600">{task.links}</span>
                </div>
              )}
              
              {/* Comments */}
              {task.comments > 0 && (
                <div className="flex items-center space-x-1">
                  <Image 
                    src="/assets/icons/Message.png" 
                    alt="Comments" 
                    width={16} 
                    height={16}
                    className="opacity-60"
                  />
                  <span className="text-sm text-gray-600">{task.comments}</span>
                </div>
              )}
              
              {/* Group Call */}
              {task.action === 'Group Call' && (
                <div className="flex items-center space-x-1">
                  <Image 
                    src="/assets/icons/Bell.png" 
                    alt="Group Call" 
                    width={16} 
                    height={16}
                    style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(86%) saturate(2696%) hue-rotate(227deg) brightness(98%) contrast(105%)' }}
                  />
                  <span className="text-sm" style={{ color: '#3772FF' }}>Group Call</span>
                </div>
              )}
              
              {/* Reports */}
              {task.reports > 0 && (
                <div className="flex items-center space-x-1">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" stroke="#F90430" strokeWidth="2"/>
                    <path d="m12 16 v-4" stroke="#F90430" strokeWidth="2" strokeLinecap="round"/>
                    <path d="m12 8 h.01" stroke="#F90430" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm" style={{ color: '#F90430' }}>{task.reports} Reports</span>
                </div>
              )}
            </div>
            
            {/* Due Date or Action */}
            <div className="flex items-center space-x-1">
              {task.dueDate ? (
                <>
                  <Image 
                    src="/assets/icons/Calendar.png" 
                    alt="Due Date" 
                    width={12} 
                    height={12}
                    className="opacity-60"
                  />
                  <span className="text-sm text-gray-600">Due: {task.dueDate}</span>
                </>
              ) : task.action === 'Stream' ? (
                <>
                  <Image 
                    src={getActionIcon(task.action)} 
                    alt={task.action} 
                    width={12} 
                    height={12}
                    className="opacity-60"
                  />
                  <span className="text-sm text-gray-600">{task.action}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 