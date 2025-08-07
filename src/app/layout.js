import "./globals.css";

export const metadata = {
  title: "Task Board App",
  description: "A Kanban-style task management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
