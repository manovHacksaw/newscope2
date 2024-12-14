// app/layout.tsx (or RootLayout.tsx depending on your file structure)

import "../globals.css";
import Sidebar from "@/components/Sidebar"; 
import Navbar from "@/components/Navbar"; 

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
      
            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
