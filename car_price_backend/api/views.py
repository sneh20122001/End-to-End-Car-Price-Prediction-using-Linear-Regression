from django.shortcuts import render
from django.http import JsonResponse
import joblib

model = joblib.load('E:/Sneh Learning/Car Price Prediction using Multiple Linear Regression/car_price_model.pkl')

def predict(request):
    if request.method == "GET":
        mileage = float(request.GET.get('mileage', 0))
        age = float(request.GET.get('age', 0))
        horsepower = float(request.GET.get('horsepower', 0))
        brand_toyota = 1 if request.GET.get('brand') == 'Toyota' else 0
        brand_bmw = 1 if request.GET.get('brand') == 'BMW' else 0
        brand_honda = 1 if request.GET.get('brand') == 'Honda' else 0

        input_features = [[mileage, age, horsepower, brand_toyota, brand_bmw,brand_honda]]
        prediction = model.predict(input_features)[0]

        return JsonResponse({
            'mileage': mileage,
            'age': age,
            'horsepower': horsepower,
            'brand': request.GET.get('brand'),
            'prediction': prediction
        })