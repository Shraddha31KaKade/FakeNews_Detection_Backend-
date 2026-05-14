import { useState } from 'react';
import { Send, FileText } from 'lucide-react';

const NewsInputBox = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-4 flex items-center gap-2 text-gray-800">
        <FileText size={20} className="text-blue-600" />
        <h2 className="text-lg font-bold">News Content to Analyze</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="min-h-[200px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
          placeholder="Paste the news article or text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="group flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Analyze News'}
            {!isLoading && <Send size={18} className="transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsInputBox;
