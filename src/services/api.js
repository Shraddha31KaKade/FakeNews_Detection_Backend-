import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual backend URL later
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictNews = async (text) => {
  // Try to use actual API, but fallback to mock for now to keep development moving
  try {
    // UNCOMMENT THIS LATER WHEN BACKEND IS READY
    // const response = await apiClient.post('/predict', { text });
    // return response.data;
    
    // MOCK RESPONSE matching your requirements
    console.log("Mocking API call for text:", text.substring(0, 50) + "...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          prediction: Math.random() > 0.5 ? "FAKE" : "REAL",
          confidence: 0.85 + (Math.random() * 0.1), // e.g. 0.85 - 0.95
          important_words: [
            { word: "shocking", score: 0.34 },
            { word: "breaking", score: 0.27 },
            { word: "revealed", score: 0.21 },
            { word: "unbelievable", score: 0.15 }
          ]
        });
      }, 1500); // simulate network delay
    });
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
