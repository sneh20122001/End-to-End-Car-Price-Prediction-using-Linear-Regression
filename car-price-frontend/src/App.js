import React, { useState } from "react";
import axios from "axios";

export default function CarPricePredictor() {
  const [mileage, setMileage] = useState("");
  const [age, setAge] = useState("");
  const [horsepower, setHorsepower] = useState("");
  const [brand, setBrand] = useState("Toyota");
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/predict/`, {
        params: { mileage, age, horsepower, brand },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200 p-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Car Price Predictor</h1>

        <input
          type="number"
          placeholder="Mileage (km)"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age (years)"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          type="number"
          placeholder="Horsepower"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={horsepower}
          onChange={(e) => setHorsepower(e.target.value)}
        />

        <select
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="Toyota">Toyota</option>
          <option value="BMW">BMW</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
        </select>

        <button
          onClick={handlePredict}
          className="w-full bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all"
        >
          Predict Price
        </button>

        {prediction && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-semibold">Predicted Price:</h2>
            <p className="text-3xl font-bold">${prediction.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
