



export default function AdminLayout({

  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    
        <div className="flex h-screen">
          {/* Sidebar */}
         
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
      
            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6">{children}</main>
          </div>
        </div>
      
  );
}
