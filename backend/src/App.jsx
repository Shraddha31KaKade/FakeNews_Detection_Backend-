import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { PredictionProvider } from './context/PredictionContext';

function App() {
  return (
    <AuthProvider>
      <PredictionProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PredictionProvider>
    </AuthProvider>
  );
}

export default App;
