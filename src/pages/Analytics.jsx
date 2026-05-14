import { usePrediction } from '../context/PredictionContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const Analytics = () => {
  const { history } = usePrediction();
  
  // Calculate stats
  const total = history.length;
  const fakeCount = history.filter(h => h.prediction === 'FAKE' || h.finalDecision === 'FAKE').length;
  const realCount = history.filter(h => h.prediction === 'REAL' || h.finalDecision === 'REAL').length;
  const uncertainCount = history.filter(h => h.finalDecision === 'UNCERTAIN').length;

  const pieData = [
    { name: 'FAKE', value: fakeCount },
    { name: 'REAL', value: realCount },
    { name: 'UNCERTAIN', value: uncertainCount }
  ];

  const COLORS = ['#ef4444', '#10b981', '#f59e0b'];

  // Process Daily Trends (Group by date)
  const getDailyData = () => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayData = history.filter(h => {
        const hDate = h.date ? h.date.split('T')[0] : new Date().toISOString().split('T')[0];
        return hDate === date;
      });

      const dayName = new Date(date).toLocaleDateString('en-IN', { weekday: 'short' });

      return {
        name: dayName,
        fake: dayData.filter(d => d.prediction === 'FAKE' || d.finalDecision === 'FAKE').length,
        real: dayData.filter(d => d.prediction === 'REAL' || d.finalDecision === 'REAL').length,
        uncertain: dayData.filter(d => d.finalDecision === 'UNCERTAIN').length
      };
    });
  };

  const trendData = getDailyData();

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">AI Insights & Analytics</h1>
          <p className="mt-2 text-gray-500 text-lg font-medium">Monitoring the pulse of Indian news verification.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
             <span className="block text-[10px] font-bold text-gray-400 uppercase">Total Analyzed</span>
             <span className="text-xl font-black text-blue-600">{total}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Distribution Chart */}
        <div className="lg:col-span-1 rounded-3xl bg-white p-8 shadow-xl border border-gray-100 flex flex-col">
          <h3 className="mb-6 text-xl font-black text-gray-800 tracking-tight">Verdict Distribution</h3>
          <div className="h-64 w-full relative">
            {total > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">No Data Available</div>
            )}
          </div>
          <div className="mt-4 space-y-2">
             {pieData.map((d, i) => (
               <div key={i} className="flex justify-between items-center text-sm font-bold">
                  <span className="flex items-center gap-2 text-gray-500">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                    {d.name}
                  </span>
                  <span className="text-gray-900">{d.value}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Daily Basis Trend Chart */}
        <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-black text-gray-800 tracking-tight">Daily Verification Trends</h3>
              <p className="text-sm text-gray-500 font-medium">Activity over the last 7 days</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="real" name="Real News" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorReal)" />
                <Area type="monotone" dataKey="fake" name="Fake News" stroke="#ef4444" strokeWidth={4} fillOpacity={1} fill="url(#colorFake)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
