export const SWIMLANES = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-gray-100',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-700'
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-100',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700'
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-yellow-100',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700'
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-100',
    borderColor: 'border-green-200',
    textColor: 'text-green-700'
  }
];

export const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

export const PRIORITY_LABELS = {
  high: 'High',
  medium: 'Medium',
  low: 'Low'
}; 