'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Menu, 
  Image as ImageIcon, 
  Settings, 
  Search,
  LogOut
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic protection
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  }, [router, pathname]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }
  
  // Don't show layout on login page
  if (pathname === '/admin/login') {
      return children;
  }

  const navItems = [

    { name: 'Pages', href: '/admin/pages', icon: FileText },
    { name: 'Categories', href: '/admin/categories', icon: Menu },
 
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              L
            </div>
            <span className="font-bold text-xl text-gray-900">LumiLogic</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
            <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm font-medium text-gray-700 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors mb-2"
            >
                <LogOut className="w-5 h-5 text-gray-400 transition-colors" />
                Sign Out
            </button>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@lumilogic.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}
