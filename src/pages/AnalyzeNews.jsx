import { useState } from 'react';
import NewsInputBox from '../components/NewsInputBox';
import PredictionCard from '../components/PredictionCard';
import HighlightedText from '../components/HighlightedText';
import Loader from '../components/Loader';
import { predictNews } from '../services/api';
import { usePrediction } from '../context/PredictionContext';

const AnalyzeNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [analyzedText, setAnalyzedText] = useState('');
  const { addPrediction } = usePrediction();

  const handleAnalyze = async (text) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await predictNews(text);
      setResult(data);
      setAnalyzedText(text);
      addPrediction({ text, prediction: data.prediction, confidence: data.confidence });
    } catch (err) {
      setError('Failed to analyze the news. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Analyze News</h1>
        <p className="mt-2 text-gray-500">
          Paste an article below to detect if it's real or fake using our advanced Explainable AI.
        </p>
      </div>

      <NewsInputBox onSubmit={handleAnalyze} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-8 animate-in fade-in duration-300">
          <Loader message="AI is analyzing linguistic patterns and confidence scores..." />
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {result && !isLoading && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-1">
            <PredictionCard 
              prediction={result.prediction} 
              confidence={result.confidence} 
            />
          </div>
          <div className="lg:col-span-2">
            <HighlightedText 
              text={analyzedText} 
              importantWords={result.important_words} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeNews;
