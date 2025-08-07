# Task Board App - Kanban Style Project Management

A modern, responsive Kanban board application built with Next.js, featuring drag-and-drop functionality, real-time search, and persistent data storage.

## 🚀 Features

### ✅ Completed Features
- **UI Implementation**: Pixel-perfect responsive design using TailwindCSS
- **Swimlane Features**: Four status-based columns (To Do, In Progress, Review, Done)
- **Drag-and-Drop Functionality**: Seamless task movement between swimlanes using @dnd-kit
- **State Management**: Zustand store with localStorage persistence
- **Prepopulate Data**: Sample tasks with realistic data
- **Data Persistence**: Automatic saving to localStorage
- **Search Task**: Real-time filtering across all swimlanes

### 🎯 Technical Requirements Met
- ✅ Next.js framework
- ✅ JavaScript implementation
- ✅ TailwindCSS styling
- ✅ Responsive design (up to 768px)
- ✅ Cross-browser compatibility
- ✅ Zustand for state management
- ✅ @dnd-kit for drag-and-drop
- ✅ localStorage persistence
- ✅ Real-time search functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: JavaScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/modifiers
- **Data Persistence**: localStorage

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd boardapp-visionex
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 Usage

### Task Management
- **View Tasks**: Tasks are organized in four swimlanes based on their status
- **Move Tasks**: Drag and drop tasks between swimlanes to update their status
- **Search**: Use the search bar to filter tasks by title, description, assignee, or tags
- **Persistent Data**: All changes are automatically saved to localStorage

### Task Information
Each task displays:
- Title and description
- Priority level (High, Medium, Low)
- Assignee with avatar
- Due date
- Tags

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Main page
├── components/
│   ├── Board.js            # Main board component
│   ├── Swimlane.js         # Individual swimlane
│   ├── TaskCard.js         # Task card component
│   └── SearchBar.js        # Search functionality
└── lib/
    ├── constants.js        # Configuration constants
    └── store.js           # Zustand store
```

## 🔧 Development

### Key Components

1. **Board.js**: Main orchestrator with DndContext
2. **Swimlane.js**: Drop zones for each status column
3. **TaskCard.js**: Draggable task items
4. **SearchBar.js**: Real-time search with debouncing
5. **store.js**: Zustand store with persistence

### State Management
- Tasks are stored in Zustand with localStorage persistence
- Search state is managed locally with debouncing
- Drag and drop updates task status automatically

## 🎨 Design Features

- **Responsive Layout**: Adapts to different screen sizes
- **Color-coded Priorities**: Visual priority indicators
- **Smooth Animations**: Hover effects and drag feedback
- **Clean UI**: Modern, minimalist design
- **Accessibility**: Proper ARIA labels and keyboard support

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop screens (1200px+)
- Tablet screens (768px - 1199px)
- Mobile screens (up to 767px)

## 🔄 Data Flow

1. **Initial Load**: Tasks loaded from localStorage or default data
2. **Drag & Drop**: Task status updated in store
3. **Search**: Real-time filtering of tasks
4. **Persistence**: All changes automatically saved to localStorage

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## 📝 Future Enhancements

- Task creation and editing
- User authentication
- Team collaboration features
- Advanced filtering options
- Task comments and attachments
- Export/import functionality

## 🤝 Contributing

This is a practical assignment demonstrating modern web development practices with Next.js and React.

## 📄 License

This project is created for educational and demonstration purposes.
