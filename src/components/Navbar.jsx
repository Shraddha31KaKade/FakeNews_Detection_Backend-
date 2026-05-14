import { Bell, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 flex w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <span className="font-bold text-xl text-blue-600">Veritas.AI</span>
        </div>

        <div className="hidden sm:block">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Explainable AI Fake News Detector
          </h2>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li className="relative">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 transition-colors">
                <Bell size={20} />
              </button>
            </li>
            <li className="relative">
              <button className="flex items-center gap-4 group">
                <span className="hidden text-right lg:block">
                  <span className="block text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user ? user.name : 'Guest'}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {user ? 'Researcher' : 'Please Login'}
                  </span>
                </span>
                <span className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <UserIcon size={20} />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
