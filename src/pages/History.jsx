import { usePrediction } from '../context/PredictionContext';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const History = () => {
  const { history } = usePrediction();

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Analysis History</h1>
        <p className="mt-2 text-gray-500">Review all your previously analyzed articles and predictions.</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50 px-6 py-4 grid grid-cols-12 gap-4 hidden sm:grid">
            <div className="col-span-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Article snippet</div>
            <div className="col-span-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Prediction</div>
            <div className="col-span-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Confidence</div>
            <div className="col-span-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {history.map((item) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-1 sm:col-span-6">
                  <p className="text-sm text-gray-900 line-clamp-2 sm:line-clamp-1">{item.text}</p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                    item.prediction === 'FAKE' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                  }`}>
                    {item.prediction === 'FAKE' ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                    {item.prediction}
                  </span>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-[60px] h-1.5 bg-gray-200 rounded-full">
                      <div 
                        className={`h-full rounded-full ${item.confidence > 0.8 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                        style={{ width: `${Math.round(item.confidence * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{Math.round(item.confidence * 100)}%</span>
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-2 text-xs sm:text-sm text-gray-500">
                  {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                </div>
              </div>
            ))}
            
            {history.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No history found. Analyze some news to see them here!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
