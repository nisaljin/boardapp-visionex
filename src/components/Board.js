'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import Swimlane from './Swimlane';
import SearchBar from './SearchBar';
import { SWIMLANES } from '@/lib/constants';
import useTaskStore from '@/lib/store';

export default function Board() {
  const { getTasksByStatus, moveTask } = useTaskStore();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      // If dropping on a different swimlane
      if (over.id && ['todo', 'in-progress', 'review', 'done'].includes(over.id)) {
        moveTask(active.id, over.id);
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
          <div className="w-80">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Board Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToHorizontalAxis]}
        >
          <div className="flex gap-6 h-full min-w-max">
            {SWIMLANES.map((lane) => (
              <Swimlane
                key={lane.id}
                lane={lane}
                tasks={getTasksByStatus(lane.id)}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
} 