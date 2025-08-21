import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="p-2 font-bold text-white bg-orange-800">
        Todo APP
      </header>

      {/* Main content */}
      <main className="container flex flex-col items-center flex-1 gap-6 p-6">{children}</main>

      {/* Footer */}
      <footer className="p-2 text-center text-orange-800 bg-orange-100">
        Amir_Ho3eiiiiN &copy; 2025 Todo App
      </footer>
    </div>
  );
}
