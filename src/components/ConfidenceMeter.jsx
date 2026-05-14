const ConfidenceMeter = ({ score }) => {
  const percentage = Math.round(score * 100);
  
  let colorClass = "bg-green-500";
  if (percentage < 60) colorClass = "bg-red-500";
  else if (percentage < 80) colorClass = "bg-yellow-500";

  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between">
        <span className="text-sm font-medium text-gray-700">Confidence Score</span>
        <span className="text-sm font-bold text-gray-900">{percentage}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ConfidenceMeter;
