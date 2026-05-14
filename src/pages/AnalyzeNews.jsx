import { useState } from 'react';
import NewsInputBox from '../components/NewsInputBox';
import PredictionCard from '../components/PredictionCard';
import HighlightedText from '../components/HighlightedText';
import VerificationPanel from '../components/VerificationPanel';
import Loader from '../components/Loader';
import { analyzeNews } from '../services/api';
import { usePrediction } from '../context/PredictionContext';
import { AlertCircle } from 'lucide-react';

const AnalyzeNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [analyzedText, setAnalyzedText] = useState('');
  const { addPrediction } = usePrediction();

  const handleAnalyze = async (text) => {
    if (!text || text.trim().length < 20) {
      setError('Please enter a longer text for accurate analysis (at least 20 characters).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await analyzeNews(text);
      
      if (response.status === 'error') {
        setError(response.message);
        return;
      }

      const data = response.data;
      setResult(data);
      setAnalyzedText(text);
      
      // Store in history context
      addPrediction({ 
        text, 
        prediction: data.prediction, 
        confidence: data.confidence,
        finalDecision: data.final_decision,
        date: new Date().toISOString()
      });
    } catch (err) {
      console.error("Analysis failed:", err);
      setError('Failed to analyze the news. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">AI News Verifier</h1>
        <p className="mt-2 text-gray-500 text-lg">
          Expert analysis for Indian news using Hybrid ML & Real-time Verification.
        </p>
      </div>

      <NewsInputBox onSubmit={handleAnalyze} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-8 animate-in fade-in duration-300">
          <Loader message="Synthesizing ML predictions, LIME explanation, and source verification..." />
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm animate-in zoom-in-95 duration-300">
          <AlertCircle className="flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {result && !isLoading && (
        <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Top Section: Verdict and Verification */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <PredictionCard 
              prediction={result.prediction} 
              confidence={result.confidence} 
              finalDecision={result.final_decision}
              proofExplanation={result.proof_explanation}
              modelUsed={result.model_used}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <VerificationPanel 
              verification={result.verification} 
            />
          </div>

          {/* Bottom Section: Full Text Analysis */}
          <div className="w-full">
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
