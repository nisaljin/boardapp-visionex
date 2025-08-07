# 🧩 Task Board App – Kanban-Style Project Management

A modern, responsive Kanban board built with **Next.js**, featuring seamless drag-and-drop, real-time search, and persistent local data storage.

📍 **Live Demo**: [https://boardapp-visionex.vercel.app](https://boardapp-visionex.vercel.app)

---

## ✅ Features Overview

### UI & UX
- **Pixel-perfect layout** based on provided Figma design
- **Responsive** up to 768px (mobile/tablet)
- **TailwindCSS** styling with clean, modern UI
- **Cross-browser compatibility**

### Core Functionality
- 🗂 **Swimlanes**: Tasks grouped by status (To Do, In Progress, Review, Done)
- 🧩 **Drag-and-Drop**: Move tasks between swimlanes with `@dnd-kit`
- ⚙️ **State Management**: Zustand for global state + `localStorage` persistence
- 📁 **Mock Data API**: Prepopulated tasks fetched from a static JSON endpoint
- 🔎 **Search**: Real-time, dynamic task filtering across all columns

---

## 🛠️ Tech Stack

| Category         | Tools Used                                                    |
|------------------|---------------------------------------------------------------|
| Framework        | Next.js 14 (App Router)                                       |
| Language         | JavaScript                                                    |
| Styling          | TailwindCSS                                                   |
| Drag & Drop      | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/modifiers`    |
| State Management | Zustand + `localStorage` persistence                          |
| Deployment       | Vercel                                                        |

---

## 📦 Getting Started

### Installation

```bash
git clone https://github.com/yourusername/boardapp-visionex.git
cd boardapp-visionex
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles
│   ├── layout.js          # App layout wrapper
│   └── page.js            # Main board page
├── components/
│   ├── Board.js           # Core board layout
│   ├── Swimlane.js        # Column for each task status
│   ├── TaskCard.js        # Individual draggable task
│   └── SearchBar.js       # Search input & filtering logic
└── lib/
    ├── constants.js       # Static values (statuses, colors, etc.)
    └── store.js           # Zustand store with localStorage integration
```

---

## 🔄 Application Flow

1. **Initialization**
   - Loads tasks from `localStorage` if available.
   - Falls back to mock JSON data (`/data/tasks.json`) on first load.

2. **Task Management**
   - Tasks are grouped in four swimlanes: To Do, In Progress, Review, Done.
   - Tasks include metadata like title, description, assignee, tags, and due date.

3. **Drag-and-Drop**
   - Drag tasks between swimlanes using `@dnd-kit`.
   - Zustand store updates the task status.
   - Changes are saved to `localStorage` automatically.

4. **Search**
   - Tasks are filtered in real time as the user types.
   - Search covers title, description, assignee, and tags.

---

## 🎨 Design & Accessibility

- **Modern UI**: Minimalist, clean design using Tailwind utility classes
- **Color-coded priorities**: Visual indicators for task urgency
- **Responsive layout**: Mobile and tablet friendly (up to 768px)
- **Accessibility**: ARIA roles, keyboard navigability, and semantic structure

---

## 🧪 Completed Technical Requirements

- ✅ Next.js with App Router
- ✅ Zustand for state management
- ✅ TailwindCSS styling
- ✅ Drag-and-drop with `@dnd-kit`
- ✅ JSON mock data source
- ✅ LocalStorage persistence
- ✅ Real-time task search
- ✅ Responsive layout (768px and below)
- ✅ Cross-browser compatibility
- ✅ Clean, incremental Git commits

---

## 🚀 Deployment

To build and deploy:

```bash
npm run build
npm start
```

App is deployed at: [https://boardapp-visionex.vercel.app](https://boardapp-visionex.vercel.app)

---

## 🚧 Future Enhancements

- Task creation & editing
- User authentication
- Board and workspace management
- Team collaboration features
- Commenting and attachments
- Import/export functionality
- Advanced filters and tags

---

## 🤝 Contributing

This project was developed as a practical coding assignment to demonstrate frontend engineering skills using modern web technologies.

---

## 📄 License

This project is intended for educational and demonstration purposes only.
