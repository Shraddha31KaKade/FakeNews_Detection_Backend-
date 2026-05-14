import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, History, BarChart2, LogOut } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const navItems = [
    { name: 'Analyze News', path: '/', icon: Search },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'History', path: '/history', icon: History },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  ];

  return (
    <aside className="relative left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#0f172a] duration-300 ease-linear">
      <div className="flex items-center justify-center gap-2 px-6 py-6 border-b border-gray-800">
        <span className="text-white text-2xl font-black tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Veritas.AI
        </span>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear flex-1">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <h3 className="mb-4 ml-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
            Menu
          </h3>
          <ul className="mb-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      clsx(
                        'group relative flex items-center gap-3 rounded-lg px-4 py-3 font-medium duration-300 ease-in-out',
                        isActive 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon size={20} className={clsx("transition-transform duration-300 group-hover:scale-110", isActive && "text-white")} />
                        {item.name}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      <div className="p-4 lg:p-6 border-t border-gray-800">
         <NavLink
            to="/login"
            className="group relative flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-red-400 duration-300 ease-in-out hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Logout
          </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
