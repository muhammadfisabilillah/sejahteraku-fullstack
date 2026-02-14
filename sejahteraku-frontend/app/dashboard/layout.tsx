'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Settings, 
  LogOut,
  User,
  BrainCircuit
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName] = useState('Muhammad');

  // Proteksi Login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/');
  }, [router]);

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'My Academy', icon: <BookOpen size={20} />, path: '/dashboard/academy' },
    { name: 'Job Board', icon: <Briefcase size={20} />, path: '/dashboard/jobs' },
    { name: 'AI Consultant', icon: <BrainCircuit size={20} />, path: '/dashboard/ai-consultant' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen text-white flex">
      {/* SIDEBAR FIXED dengan backdrop blur */}
      <aside className="w-72 border-r border-white/10 flex flex-col p-8 bg-black/40 backdrop-blur-xl fixed h-screen z-50">
        <div className="flex items-center gap-3 mb-12">
           <span className="text-2xl font-display font-bold tracking-tighter text-white uppercase italic">
            Sejahtera<span className="text-amber-500">Ku</span>
          </span>
        </div>

        <nav className="flex-grow space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
            
            return (
              <Link 
                key={item.name}
                href={item.path}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isActive 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                  : 'text-stone-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </nav>

        {/* BAGIAN PROFIL USER */}
        <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-stone-800 border border-white/10 flex items-center justify-center">
              <User size={20} className="text-amber-500" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{userName}</p>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest font-black">Pro Member</p>
            </div>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('token'); router.push('/'); }}
            className="w-full flex items-center gap-4 px-4 py-3 text-stone-500 hover:text-red-500 transition-colors font-bold text-sm"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA - tanpa background warna solid */}
      <main className="flex-grow ml-72 min-h-screen">
        {children}
      </main>
    </div>
  );
}