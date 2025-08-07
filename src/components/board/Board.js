import React, { useEffect, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
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
      
      if (!hasStoredData) {
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
    const task = getAllTasks().find(t => t.id === active.id);
    setActiveTask(task);
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Find the source and destination columns
    const sourceColumn = boardData.columns.find(col => 
      col.tasks.some(task => task.id === activeId)
    );
    const destinationColumn = boardData.columns.find(col => col.id === overId);

    if (sourceColumn && destinationColumn) {
      moveTask(activeId, sourceColumn.id, destinationColumn.id);
    }
  };

  // Get all tasks from all columns
  const getAllTasks = () => {
    return boardData.columns.flatMap(column => column.tasks);
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
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-white">
        {/* Project Heading */}
        <ProjectHeading />
        
        {/* Separator */}
        <div className="border-t border-gray-200"></div>
        
        {/* Board Container */}
        <div className="h-[calc(100vh-120px)] overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading tasks...</p>
              </div>
            </div>
          ) : (
            <div className="h-full">
              {/* Mobile: Horizontal scrollable layout */}
              <div className="md:hidden h-full overflow-x-auto overflow-y-hidden">
                <div className="flex h-full min-w-max">
                  {boardData.columns.map((column) => (
                    <div key={column.id} className="w-80 flex-shrink-0 border-r border-gray-200 last:border-r-0">
                      <DroppableColumn
                        column={column}
                        tasks={getTasksByColumn(column.id)}
                        onAddTask={handleAddTask}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Desktop: Grid layout */}
              <div className="hidden md:block h-full">
                <div className="relative h-full">
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
                    {boardData.columns.map((column) => (
                      <DroppableColumn
                        key={column.id}
                        column={column}
                        tasks={getTasksByColumn(column.id)}
                        onAddTask={handleAddTask}
                      />
                    ))}
                  </div>
                  {/* Vertical separators for larger screens */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
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
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTask ? (
          <TaskCard task={activeTask} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board; 