import { Loader2 } from 'lucide-react';

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      <p className="text-gray-500 font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
