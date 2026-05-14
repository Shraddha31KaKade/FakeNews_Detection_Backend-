import { createContext, useState, useContext } from 'react';

const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
  // Mock initial history data
  const [history, setHistory] = useState([]);

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
