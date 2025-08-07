import React, { useEffect, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import useBoardStore from '../../lib/store';
import DroppableColumn from './DroppableColumn';
import ProjectHeading from './ProjectHeading';
import TaskCard from './TaskCard';

const Board = () => {
  const { 
    boardData, 
    isLoading, 
    error, 
    setBoardData, 
    setLoading, 
    setError, 
    getTasksByColumn,
    addTask,
    moveTask,
    reorderTasksInColumn,
    searchQuery,
    _hasHydrated 
  } = useBoardStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch board data from API
  const fetchBoardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/board');
      const result = await response.json();
      
      if (result.success) {
        setBoardData(result.data);
      } else {
        setError(result.error || 'Failed to fetch board data');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Initialize board data
  useEffect(() => {
    if (_hasHydrated && !isInitialized) {
      // Check if we have data in localStorage
      const hasStoredData = boardData.columns.some(col => col.tasks.length > 0);
      console.log('🔍 Has stored data:', hasStoredData);
      console.log('📊 Board data:', boardData);
      
      if (!hasStoredData) {
        console.log('🌐 Fetching board data from API...');
        fetchBoardData();
      }
      
      setIsInitialized(true);
    }
  }, [_hasHydrated, isInitialized, boardData.columns]);

  // Handle adding new task
  const handleAddTask = (columnId) => {
    const newTask = {
      id: Date.now().toString(),
      title: 'New Task',
      category: 'other',
      categoryColor: 'bg-gray-500',
      priority: 'low',
      assignees: 1,
      links: 0,
      comments: 0,
      hasAttachment: false
    };
    
    addTask(columnId, newTask);
  };

  // Handle drag start
  const handleDragStart = (event) => {
    const { active } = event;
    console.log('🚀 Drag start event:', { active });
    const task = getAllTasks().find(t => t.id === active.id);
    console.log('🎯 Found task:', task);
    setActiveTask(task);
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    console.log('Drag end event:', { active, over });

    if (!over) {
      console.log('No over target, returning');
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    console.log('Active ID:', activeId, 'Over ID:', overId);

    if (activeId === overId) {
      console.log('Same ID, returning');
      return;
    }

    // Find the active task and its current column
    const activeTask = getAllTasks().find(task => task.id === activeId);
    const activeColumn = boardData.columns.find(col => 
      col.tasks.some(task => task.id === activeId)
    );

    if (!activeTask || !activeColumn) {
      console.log('Active task or column not found');
      return;
    }

    // Determine the target based on over.data
    const overData = over.data.current;
    
    if (overData?.type === 'column') {
      // Dropped on a column - move to end of that column
      const targetColumnId = overId;
      if (activeColumn.id !== targetColumnId) {
        console.log('Moving task to column:', targetColumnId);
        moveTask(activeId, activeColumn.id, targetColumnId);
      }
    } else if (overData?.type === 'task') {
      // Dropped on another task
      const overTask = overData.task;
      const overColumn = boardData.columns.find(col => 
        col.tasks.some(task => task.id === overId)
      );

      if (!overColumn) {
        console.log('Over column not found');
        return;
      }

      if (activeColumn.id === overColumn.id) {
        // Same column - reorder
        console.log('Reordering within column:', activeColumn.id);
        reorderTasksInColumn(activeColumn.id, activeId, overId);
      } else {
        // Different column - move task
        console.log('Moving task from', activeColumn.id, 'to', overColumn.id);
        moveTask(activeId, activeColumn.id, overColumn.id);
      }
    } else {
      // Fallback - try to determine column by overId
      const overColumn = boardData.columns.find(col => col.id === overId);
      if (overColumn && activeColumn.id !== overColumn.id) {
        console.log('Fallback: Moving task to column:', overId);
        moveTask(activeId, activeColumn.id, overId);
      }
    }
  };

  // Get all tasks from all columns
  const getAllTasks = () => {
    const allTasks = boardData.columns.flatMap(column => column.tasks);
    console.log('📋 Total tasks:', allTasks.length);
    return allTasks;
  };

  if (!_hasHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading board...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchBoardData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-white">
        {/* Project Heading */}
        <ProjectHeading />
        
        {/* Separator */}
        <div className="border-t border-gray-200"></div>
        
        {/* Board Container */}
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading tasks...</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {boardData.columns.map((column) => {
                  const columnTasks = getTasksByColumn(column.id);
                  console.log(`🏛️ Column ${column.id}:`, columnTasks.length, 'tasks');
                  return (
                    <DroppableColumn
                      key={column.id}
                      column={column}
                      tasks={columnTasks}
                      onAddTask={handleAddTask}
                    />
                  );
                })}
              </div>
              {/* Vertical separators for larger screens */}
              <div className="hidden md:block absolute inset-0 pointer-events-none">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
                  {boardData.columns.map((_, index) => (
                    <div key={index} className="relative">
                      {index < boardData.columns.length - 1 && (
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Board; 