"use client"

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MessageSquare, Image, Share2, LogOut, Menu, X, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Closed by default on mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Chat', href: '/admin/chat', icon: MessageSquare },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
    { name: 'Social Media', href: '/admin/social-media', icon: Share2 },
    { name: 'Bookings', href: '/admin/book', icon: BookOpen },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const handleNavClick = (href: string) => {
    router.push(href);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-800 text-white p-4 flex items-center justify-between z-50 shadow-lg">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside
        className={`
          fixed lg:relative
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'lg:w-64' : 'lg:w-20'}
          w-64
          h-full
          bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white 
          transition-all duration-300 
          flex flex-col
          z-50
          mt-16 lg:mt-0
        `}
      >
        {/* Desktop Header */}
        <div className="hidden lg:flex p-4 items-center justify-between border-b border-white/10">
          {sidebarOpen ? (
            <>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors mx-auto"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium lg:hidden">{item.name}</span>
                {sidebarOpen && (
                  <span className="hidden lg:inline font-medium">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="mb-3 px-2 lg:hidden">
            <p className="text-xs text-white/60 mb-1">Logged in as</p>
            <p className="text-sm font-medium truncate">{user?.email}</p>
          </div>
          {sidebarOpen ? (
            <div className="hidden lg:block">
              <div className="mb-3 px-2">
                <p className="text-xs text-white/60 mb-1">Logged in as</p>
                <p className="text-sm font-medium truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-white"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden lg:flex w-full p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors items-center justify-center"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleLogout}
            className="lg:hidden w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-white"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto mt-16 lg:mt-0">
        {children}
      </main>
    </div>
  );
}
