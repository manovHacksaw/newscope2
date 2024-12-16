import Sidebar from "@/components/Sidebar"; 

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          <div className="flex-1 ml-64 flex flex-col"> {/* Add margin-left for sidebar width */}
            {/* Navbar (optional) */}
            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
