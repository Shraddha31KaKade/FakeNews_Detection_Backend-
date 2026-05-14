import { createContext, useState, useContext } from 'react';

const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
  // Mock initial history data
  const [history, setHistory] = useState([
    {
      id: 1,
      text: "Scientists discover a new species of deep-sea jellyfish that glows in the dark.",
      prediction: "REAL",
      confidence: 0.95,
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 2,
      text: "Shocking! Drink this magical potion to lose 50 pounds in one day without exercising!",
      prediction: "FAKE",
      confidence: 0.98,
      date: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 3,
      text: "The local city council has approved the construction of a new public library downtown.",
      prediction: "REAL",
      confidence: 0.88,
      date: new Date(Date.now() - 259200000).toISOString(),
    }
  ]);

  const addPrediction = (predictionData) => {
    setHistory([{ id: Date.now(), ...predictionData, date: new Date().toISOString() }, ...history]);
  };

  return (
    <PredictionContext.Provider value={{ history, addPrediction }}>
      {children}
    </PredictionContext.Provider>
  );
};

export const usePrediction = () => useContext(PredictionContext);
