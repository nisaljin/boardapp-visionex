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
        console.log('moveTask called with:', { taskId, fromColumnId, toColumnId });
        
        set((state) => {
          const fromColumn = state.boardData.columns.find(col => col.id === fromColumnId);
          const toColumn = state.boardData.columns.find(col => col.id === toColumnId);
          
          console.log('Found columns:', { 
            fromColumn: fromColumn?.id, 
            toColumn: toColumn?.id,
            fromColumnTasks: fromColumn?.tasks.length,
            toColumnTasks: toColumn?.tasks.length
          });
          
          if (!fromColumn || !toColumn) {
            console.log('Column not found, returning state');
            return state;
          }
          
          const task = fromColumn.tasks.find(t => t.id === taskId);
          if (!task) {
            console.log('Task not found, returning state');
            return state;
          }
          
          console.log('Found task:', task.title, 'Moving from', fromColumnId, 'to', toColumnId);
          
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
          
          console.log('New state columns:', newState.boardData.columns.map(col => ({
            id: col.id,
            taskCount: col.tasks.length
          })));
          
          return newState;
        });
      },

      // Reorder tasks within the same column
      reorderTasksInColumn: (columnId, activeTaskId, overTaskId) => {
        console.log('reorderTasksInColumn called with:', { columnId, activeTaskId, overTaskId });
        
        set((state) => {
          const column = state.boardData.columns.find(col => col.id === columnId);
          
          if (!column) {
            console.log('Column not found, returning state');
            return state;
          }
          
          const tasks = [...column.tasks];
          const activeIndex = tasks.findIndex(task => task.id === activeTaskId);
          const overIndex = tasks.findIndex(task => task.id === overTaskId);
          
          if (activeIndex === -1 || overIndex === -1) {
            console.log('Task not found in column, returning state');
            return state;
          }
          
          console.log('Reordering from index', activeIndex, 'to index', overIndex);
          
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
          
          console.log('Tasks reordered in column:', columnId);
          
          return newState;
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