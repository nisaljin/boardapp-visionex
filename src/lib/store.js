import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Enhanced sample task data matching Figma design
const initialTasks = [
  {
    id: '1',
    title: 'User interview',
    description: 'Conduct user interviews for the new feature',
    status: 'todo',
    priority: 'low',
    category: 'research',
    assignee: 'John Doe',
    dueDate: '2024-02-15',
    attachments: 2,
    comments: 2,
    tags: ['research', 'user-testing']
  },
  {
    id: '2',
    title: 'UI Design',
    description: 'Create wireframes and mockups for the new landing page',
    status: 'in-progress',
    priority: 'high',
    category: 'design',
    assignee: 'Jane Smith',
    dueDate: '2024-02-20',
    attachments: 35,
    comments: 243,
    tags: ['design', 'frontend'],
    hasImage: true
  },
  {
    id: '3',
    title: 'Prototype',
    description: 'Build interactive prototype for user testing',
    status: 'approved',
    priority: 'medium',
    category: 'interface',
    assignee: 'Mike Johnson',
    dueDate: '2024-02-25',
    attachments: 12,
    comments: 45,
    tags: ['prototype', 'testing']
  },
  {
    id: '4',
    title: 'Feedback Collection',
    description: 'Gather feedback from stakeholders',
    status: 'reject',
    priority: 'low',
    category: 'feedback',
    assignee: 'Sarah Wilson',
    dueDate: '2024-02-10',
    attachments: 5,
    comments: 18,
    tags: ['feedback', 'stakeholders']
  },
  {
    id: '5',
    title: 'Presentation',
    description: 'Prepare presentation for the client meeting',
    status: 'todo',
    priority: 'high',
    category: 'presentation',
    assignee: 'Alex Brown',
    dueDate: '2024-03-01',
    attachments: 8,
    comments: 12,
    tags: ['presentation', 'client']
  },
  {
    id: '6',
    title: 'Market Research',
    description: 'Analyze competitor products and market trends',
    status: 'in-progress',
    priority: 'medium',
    category: 'research',
    assignee: 'Emma Davis',
    dueDate: '2024-02-28',
    attachments: 15,
    comments: 67,
    tags: ['research', 'market-analysis']
  }
];

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      searchQuery: '',
      _hasHydrated: false, // Add hydration flag
      
      // Add a new task
      addTask: (task) => {
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now().toString() }]
        }));
      },
      
      // Update a task
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          )
        }));
      },
      
      // Delete a task
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        }));
      },
      
      // Move task between swimlanes
      moveTask: (taskId, newStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        }));
      },
      
      // Set search query
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      // Get filtered tasks based on search query
      getFilteredTasks: () => {
        const { tasks, searchQuery } = get();
        if (!searchQuery.trim()) return tasks;
        
        return tasks.filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      },
      
      // Get tasks by status
      getTasksByStatus: (status) => {
        const filteredTasks = get().getFilteredTasks();
        return filteredTasks.filter((task) => task.status === status);
      },

      // Set hydration state
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'task-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }), // Only persist tasks
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useTaskStore; 