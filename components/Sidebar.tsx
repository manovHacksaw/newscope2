import Link from "next/link";
import { Button } from "./ui/button";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full shadow-lg">
      {/* Sidebar Header */}
      <div className="flex justify-center items-center h-16 bg-gray-900 border-b border-gray-700">
        <span className="text-xl font-semibold">Admin Panel</span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-4">
          {/* Create News */}
          <li>
            <Link
              href="/author/publish"
              className="block py-3 px-4 rounded-lg bg-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
            >
              Publish News
            </Link>
          </li>

          {/* Add more links if needed */}
          
          {/* Logout Button */}
          <li className="block py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200 ease-in-out">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
