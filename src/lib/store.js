import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Sample task data
const initialTasks = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the new landing page',
    status: 'todo',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-02-15',
    tags: ['design', 'frontend']
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Jane Smith',
    dueDate: '2024-02-20',
    tags: ['backend', 'security']
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all API endpoints and their usage',
    status: 'review',
    priority: 'medium',
    assignee: 'Mike Johnson',
    dueDate: '2024-02-25',
    tags: ['documentation', 'api']
  },
  {
    id: '4',
    title: 'Fix responsive design issues',
    description: 'Resolve mobile layout problems',
    status: 'done',
    priority: 'low',
    assignee: 'Sarah Wilson',
    dueDate: '2024-02-10',
    tags: ['frontend', 'responsive']
  },
  {
    id: '5',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'todo',
    priority: 'medium',
    assignee: 'Alex Brown',
    dueDate: '2024-03-01',
    tags: ['devops', 'automation']
  }
];

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      searchQuery: '',
      
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
      }
    }),
    {
      name: 'task-storage', // localStorage key
      partialize: (state) => ({ tasks: state.tasks }), // Only persist tasks
    }
  )
);

export default useTaskStore; 