import { NextResponse } from 'next/server';

// Mock data matching the Figma design
const mockBoardData = {
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-gray-500',
      tasks: [
        {
          id: '1',
          title: 'User interview',
          category: 'research',
          categoryColor: 'bg-green-500',
          priority: 'low',
          assignees: 1,
          links: 2,
          comments: 2,
          dueDate: 'Tomorrow',
          hasAttachment: false
        },
        {
          id: '2',
          title: 'Design System',
          category: 'design',
          categoryColor: 'bg-red-500',
          priority: 'medium',
          assignees: 3,
          links: 3,
          comments: 8,
          reports: 2,
          hasAttachment: false
        },
        {
          id: '3',
          title: 'Speech',
          category: 'other',
          categoryColor: 'bg-gray-500',
          priority: 'low',
          assignees: 5,
          links: 1,
          comments: 3,
          action: 'Stream',
          hasAttachment: false
        },
        {
          id: '4',
          title: 'Wireframe',
          category: 'design',
          categoryColor: 'bg-red-500',
          priority: 'high',
          assignees: 5,
          links: 0,
          comments: 0,
          hasAttachment: true
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-orange-500',
      tasks: [
        {
          id: '5',
          title: 'UI Design',
          category: 'design',
          categoryColor: 'bg-red-500',
          priority: 'high',
          assignees: 3,
          links: 2,
          comments: 2,
          dueDate: 'Tomorrow',
          hasAttachment: false
        },
        {
          id: '6',
          title: 'Check Clients Feedback',
          category: 'feedback',
          categoryColor: 'bg-blue-500',
          priority: 'low',
          assignees: 5,
          links: 8,
          dueDate: '22 April, 2022',
          hasAttachment: true
        },
        {
          id: '7',
          title: 'Copyright',
          category: 'presentation',
          categoryColor: 'bg-orange-500',
          priority: 'low',
          assignees: 1,
          links: 4,
          dueDate: '22 April, 2022',
          hasAttachment: false
        },
        {
          id: '8',
          title: 'Filter sorting',
          category: 'ux-research',
          categoryColor: 'bg-yellow-500',
          priority: 'low',
          assignees: 3,
          links: 0,
          comments: 0,
          hasAttachment: true
        }
      ]
    },
    {
      id: 'approved',
      title: 'Approved',
      color: 'bg-green-500',
      tasks: [
        {
          id: '9',
          title: 'Prototype',
          category: 'research',
          categoryColor: 'bg-green-500',
          priority: 'low',
          assignees: 5,
          links: 35,
          comments: 243,
          hasAttachment: false
        },
        {
          id: '10',
          title: 'Detail Page',
          category: 'design',
          categoryColor: 'bg-red-500',
          priority: 'low',
          assignees: 5,
          links: 6,
          comments: 28,
          hasAttachment: true
        },
        {
          id: '11',
          title: 'Animation preloaders',
          category: 'interface',
          categoryColor: 'bg-black',
          priority: 'high',
          assignees: 1,
          links: 4,
          comments: 9,
          isHighlighted: true,
          hasAttachment: false
        },
        {
          id: '12',
          title: 'Sorting category',
          category: 'ux-research',
          categoryColor: 'bg-yellow-500',
          priority: 'high',
          assignees: 3,
          links: 0,
          comments: 0,
          hasAttachment: true
        }
      ]
    },
    {
      id: 'reject',
      title: 'Reject',
      color: 'bg-red-500',
      tasks: [
        {
          id: '13',
          title: 'Group Managment',
          category: 'other',
          categoryColor: 'bg-gray-500',
          priority: 'low',
          assignees: 1,
          links: 0,
          comments: 329,
          action: 'Group Call',
          hasAttachment: false
        },
        {
          id: '14',
          title: 'Design System',
          category: 'design',
          categoryColor: 'bg-red-500',
          priority: 'low',
          assignees: 1,
          links: 3,
          comments: 8,
          reports: 2,
          hasAttachment: false
        },
        {
          id: '15',
          title: 'Slider controls',
          category: 'interface',
          categoryColor: 'bg-black',
          priority: 'low',
          assignees: 3,
          links: 8,
          comments: 31,
          hasAttachment: false
        },
        {
          id: '16',
          title: 'Slider controls',
          category: 'design',
          categoryColor: 'bg-red-500',
          priority: 'low',
          assignees: 5,
          links: 0,
          comments: 0,
          hasAttachment: true
        }
      ]
    }
  ]
};

export async function GET() {
  try {
    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json({
      success: true,
      data: mockBoardData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch board data' },
      { status: 500 }
    );
  }
} 