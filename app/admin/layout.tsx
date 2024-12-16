
import "../globals.css";


export default function AdminLayout({

  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
