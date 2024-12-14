import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <div className="flex justify-center items-center h-16 bg-gray-900">
        <span className="text-xl font-semibold">Admin Panel</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul>
          <li>
            <Link href="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
              Users
            </Link>
          </li>
          <li>
            <Link href="/admin/settings" className="block py-2 px-4 rounded hover:bg-gray-700">
              Settings
            </Link>
          </li>
          <li>
            <Link href="/admin/logout" className="block py-2 px-4 rounded hover:bg-gray-700">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
