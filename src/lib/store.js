import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { arrayMove } from '@dnd-kit/sortable';

// Initial board data structure
const initialBoardData = {
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-gray-500',
      tasks: []
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-orange-500',
      tasks: []
    },
    {
      id: 'approved',
      title: 'Approved',
      color: 'bg-green-500',
      tasks: []
    },
    {
      id: 'reject',
      title: 'Reject',
      color: 'bg-red-500',
      tasks: []
    }
  ]
};

const useBoardStore = create(
  persist(
    (set, get) => ({
      boardData: initialBoardData,
      isLoading: false,
      error: null,
      _hasHydrated: false,
      searchQuery: '',
      
      // Set board data from API
      setBoardData: (data) => {
        set({ boardData: data, isLoading: false, error: null });
      },
      
      // Set search query
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      // Set loading state
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
      
      // Set error state
      setError: (error) => {
        set({ error, isLoading: false });
      },
      
      // Add a new task to a column
      addTask: (columnId, task) => {
        set((state) => ({
          boardData: {
            ...state.boardData,
            columns: state.boardData.columns.map((column) =>
              column.id === columnId
                ? { ...column, tasks: [...column.tasks, { ...task, id: task.id || Date.now().toString() }] }
                : column
            )
          }
        }));
      },
      
      // Update a task
      updateTask: (taskId, updates) => {
        set((state) => ({
          boardData: {
            ...state.boardData,
            columns: state.boardData.columns.map((column) => ({
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updates } : task
              )
            }))
          }
        }));
      },
      
      // Delete a task
      deleteTask: (taskId) => {
        set((state) => ({
          boardData: {
            ...state.boardData,
            columns: state.boardData.columns.map((column) => ({
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId)
            }))
          }
        }));
      },
      
      // Move task between columns
      moveTask: (taskId, fromColumnId, toColumnId) => {
        set((state) => {
          const fromColumn = state.boardData.columns.find(col => col.id === fromColumnId);
          const toColumn = state.boardData.columns.find(col => col.id === toColumnId);
          
          if (!fromColumn || !toColumn) {
            return state;
          }
          
          const task = fromColumn.tasks.find(t => t.id === taskId);
          if (!task) {
            return state;
          }
          
          const newState = {
            boardData: {
              ...state.boardData,
              columns: state.boardData.columns.map((column) => {
                if (column.id === fromColumnId) {
                  return {
                    ...column,
                    tasks: column.tasks.filter((t) => t.id !== taskId)
                  };
                }
                if (column.id === toColumnId) {
                  return {
                    ...column,
                    tasks: [task, ...column.tasks]  // Add to the beginning instead of end
                  };
                }
                return column;
              })
            }
          };
          
          return newState;
        });
      },

      // Reorder tasks within the same column
      reorderTasksInColumn: (columnId, activeTaskId, overTaskId) => {
        set((state) => {
          const column = state.boardData.columns.find(col => col.id === columnId);
          
          if (!column) {
            return state;
          }
          
          const tasks = [...column.tasks];
          const activeIndex = tasks.findIndex(task => task.id === activeTaskId);
          const overIndex = tasks.findIndex(task => task.id === overTaskId);
          
          if (activeIndex === -1 || overIndex === -1) {
            return state;
          }
          
          // Use arrayMove from @dnd-kit/sortable
          const reorderedTasks = arrayMove(tasks, activeIndex, overIndex);
          
          const newState = {
            boardData: {
              ...state.boardData,
              columns: state.boardData.columns.map((col) => 
                col.id === columnId 
                  ? { ...col, tasks: reorderedTasks }
                  : col
              )
            }
          };
          
          return newState;
        });
      },
      
      // Get tasks by column (with search filtering)
      getTasksByColumn: (columnId) => {
        const state = get();
        const column = state.boardData.columns.find(col => col.id === columnId);
        if (!column) return [];
        
        // If no search query, return all tasks
        if (!state.searchQuery.trim()) {
          return column.tasks;
        }
        
        // Filter tasks based on search query
        const searchLower = state.searchQuery.toLowerCase();
        return column.tasks.filter(task => 
          task.title.toLowerCase().includes(searchLower) ||
          (task.description && task.description.toLowerCase().includes(searchLower)) ||
          (task.category && task.category.toLowerCase().includes(searchLower)) ||
          (task.assignee && task.assignee.toLowerCase().includes(searchLower))
        );
      },
      
      // Get all tasks (with search filtering)
      getAllTasks: () => {
        const state = get();
        const allTasks = state.boardData.columns.flatMap(column => column.tasks);
        
        // If no search query, return all tasks
        if (!state.searchQuery.trim()) {
          return allTasks;
        }
        
        // Filter tasks based on search query
        const searchLower = state.searchQuery.toLowerCase();
        return allTasks.filter(task => 
          task.title.toLowerCase().includes(searchLower) ||
          (task.description && task.description.toLowerCase().includes(searchLower)) ||
          (task.category && task.category.toLowerCase().includes(searchLower)) ||
          (task.assignee && task.assignee.toLowerCase().includes(searchLower))
        );
      },
      
      // Set hydration state
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'board-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ boardData: state.boardData }), // Only persist board data, not search query
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useBoardStore; 