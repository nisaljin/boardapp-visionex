import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
      
      // Set board data from API
      setBoardData: (data) => {
        set({ boardData: data, isLoading: false, error: null });
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
                ? { ...column, tasks: [...column.tasks, { ...task, id: Date.now().toString() }] }
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
          
          if (!fromColumn || !toColumn) return state;
          
          const task = fromColumn.tasks.find(t => t.id === taskId);
          if (!task) return state;
          
          return {
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
                    tasks: [...column.tasks, task]
                  };
                }
                return column;
              })
            }
          };
        });
      },
      
      // Get tasks by column
      getTasksByColumn: (columnId) => {
        const column = get().boardData.columns.find(col => col.id === columnId);
        return column ? column.tasks : [];
      },
      
      // Get all tasks
      getAllTasks: () => {
        return get().boardData.columns.flatMap(column => column.tasks);
      },
      
      // Set hydration state
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'board-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ boardData: state.boardData }), // Only persist board data
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useBoardStore; 