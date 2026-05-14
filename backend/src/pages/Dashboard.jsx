import { usePrediction } from '../context/PredictionContext';
import { AlertTriangle, CheckCircle, FileText, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { history } = usePrediction();
  
  const totalAnalyzed = history.length;
  const fakeCount = history.filter(h => h.prediction === 'FAKE').length;
  const realCount = history.filter(h => h.prediction === 'REAL').length;
  
  const fakePercentage = totalAnalyzed ? Math.round((fakeCount / totalAnalyzed) * 100) : 0;
  const realPercentage = totalAnalyzed ? Math.round((realCount / totalAnalyzed) * 100) : 0;

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-500">Overview of your news analysis activities.</p>
        </div>
        <Link to="/" className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-all hover:bg-blue-700">
          Analyze New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Analyzed</p>
            <h3 className="text-2xl font-black text-gray-900">{totalAnalyzed}</h3>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Fake News</p>
            <h3 className="text-2xl font-black text-gray-900">{fakeCount}</h3>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Real News</p>
            <h3 className="text-2xl font-black text-gray-900">{realCount}</h3>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Fake Ratio</p>
            <h3 className="text-2xl font-black text-gray-900">{fakePercentage}%</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Analyses</h3>
          <div className="space-y-4">
            {history.slice(0, 4).map(item => (
              <div key={item.id} className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="mr-4 flex-1">
                  <p className="line-clamp-2 text-sm text-gray-800">{item.text}</p>
                  <p className="mt-1 text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-bold ${item.prediction === 'FAKE' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {item.prediction}
                </div>
              </div>
            ))}
            {history.length === 0 && <p className="text-gray-500 text-sm">No analyses yet.</p>}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center min-h-[300px]">
            <h3 className="mb-4 text-lg font-bold text-gray-900 w-full text-left">Ratio Overview</h3>
            <div className="flex h-48 w-full max-w-xs items-end justify-between gap-4">
               <div className="w-1/2 rounded-t-xl bg-red-500 transition-all duration-1000 ease-in-out relative flex items-end justify-center" style={{ height: `${fakePercentage || 5}%` }}>
                  {fakePercentage > 0 && <div className="absolute -top-6 text-xs font-bold text-gray-700">{fakePercentage}%</div>}
               </div>
               <div className="w-1/2 rounded-t-xl bg-green-500 transition-all duration-1000 ease-in-out relative flex items-end justify-center" style={{ height: `${realPercentage || 5}%` }}>
                  {realPercentage > 0 && <div className="absolute -top-6 text-xs font-bold text-gray-700">{realPercentage}%</div>}
               </div>
            </div>
            <div className="mt-4 flex w-full max-w-xs justify-between px-4">
               <span className="text-sm font-bold text-gray-600">Fake</span>
               <span className="text-sm font-bold text-gray-600">Real</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
