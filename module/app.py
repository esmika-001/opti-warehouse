from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
import joblib
from prophet import Prophet
import os
from datetime import datetime
import sys

# Add project-specific utilities path (for quickpath functionality)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.batch.simulation_batch import simulate_batch
from utils.cluster.simulation_cluster import simulation_cluster
from flask_cors import CORS
from utils.results.plot import plot_simulation1, plot_simulation2

app = Flask(__name__)

# Load the models (adjust paths as necessary)
eco_label_model = joblib.load('eco_label_model.pkl')  # Pre-trained eco-label model
inventory_model = joblib.load('inventory_model.pkl')  # Pre-trained inventory model
label_encoders = joblib.load("label_encoders.pkl")


@app.route('/verify_eco_label', methods=['POST'])
def verify_eco_label():

    try:
        # # Extract inputs from the form
        product_id = int(request.json.get('product_id')[1:])
        manufacturer = label_encoders["Supplier"].transform([request.json.get('supplier')])[0]
        certificate_issuer = label_encoders["Certificate Issuer"].transform([request.json.get('certificate_issued_by')])[0]
        claims_num = label_encoders["Claims"].transform([request.json.get('claims')])[0]
        expiry_date_str = request.json.get('expiry_date')
        print(expiry_date_str)
        expiry_date = datetime.strptime(expiry_date_str, '%d-%m-%Y').date()
        days_to_expiry = (expiry_date - datetime.today().date()).days
        
        # # Prepare data for prediction (adjust for your model's input requirements)
        # input_data 
        input_data = pd.DataFrame([[product_id, certificate_issuer, claims_num, manufacturer, days_to_expiry]],
                                  columns=["Product ID", "Certificate Issuer", "Claims", "Supplier", "Days to Expiry"])
        # Predict
        prediction = eco_label_model.predict(input_data)[0]  
        verified = "Verified" if prediction == 1 else "Not Verified"
        
        # Output
        return jsonify({"eco_label_status": verified})
        
        
    except Exception as e:
        print(f"Error in prediction: {e}")
        return jsonify({"eco_label_status": "Invalid input"})


# Configuration for paths and parameters
MODEL_PATH = "inventory_model.pkl"
DATA_PATH = r'static/in/df_lines.csv'
OUTPUT_PATH = r'static/out/'

# Ensure output directory exists
if not os.path.exists(OUTPUT_PATH):
    os.makedirs(OUTPUT_PATH)

# Functions for predict functionality
def load_or_train_model():
    if os.path.exists(MODEL_PATH):
        try:
            return joblib.load(MODEL_PATH)
        except Exception as e:
            raise RuntimeError(f"Error loading model: {e}")
    else:
        # Train a new model if not found
        np.random.seed(42)
        date_rng = pd.date_range(start='2020-01-01', end='2023-12-31', freq='D')
        inventory_data = {
            'date': date_rng,
            'sales': np.maximum(50 + np.random.randn(len(date_rng)).cumsum(), 0)
        }
        data = pd.DataFrame(inventory_data)
        data.rename(columns={'date': 'ds', 'sales': 'y'}, inplace=True)

        model = Prophet(daily_seasonality=True)
        model.fit(data)

        # Save the trained model
        joblib.dump(model, MODEL_PATH)
        return model

@app.route('/predict_inventory', methods=['POST'])
def predict_inventory():
    try:
        request_data = request.json
        month = request_data.get('month')  # Expected format: YYYY-MM
        year = request_data.get('year')  # Expected format: YYYY-MM
        product_id = request_data.get('product_id')  # Placeholder, currently not used

        if not month:
            return jsonify({"error": "Month (YYYY-MM) is required"}), 400

        model = load_or_train_model()

        # Prepare prediction range
        future_start_date = f"{year}-{month}-01"
        future_end_date = (pd.to_datetime(future_start_date) + pd.DateOffset(months=1) - pd.Timedelta(days=1)).date()
        prediction_period = pd.date_range(start=future_start_date, end=future_end_date, freq='D')

        # Predict future
        future = pd.DataFrame({"ds": prediction_period})
        forecast = model.predict(future)

        predictions = forecast[['ds', 'yhat']].to_dict(orient='records')
        
        count=0
        
        for i in range(len(predictions)):
            count += predictions[i]['yhat']
        
        return jsonify({"predictions":int( count/len(predictions))})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/train_model', methods=['POST'])
def train_model():
    try:
        model = load_or_train_model()
        return jsonify({"message": "Model trained successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Functions for quickpath functionality
@app.route('/quick_path', methods=['POST'])
def simulate_order_batch():
    try:
        n1 = int(request.json.get('min_orders', 1))
        n2 = int(request.json.get('max_orders', 10))
        lines_number = int(request.json.get('no_of_lines', 5000))

        df_orderlines = pd.read_csv(DATA_PATH).head(lines_number)

        y_low, y_high = 5.5, 50
        origin_loc = [0, y_low]
        df_waves, df_results = simulate_batch(n1, n2, y_low, y_high, origin_loc, lines_number, df_orderlines)

        result_csv_path = os.path.join(OUTPUT_PATH, "batch_simulation_results.csv")
        df_results.to_csv(result_csv_path, index=False)

        plot_simulation1(df_results, lines_number)

        return jsonify({
            "status": "success",
            "message": "Batch simulation completed successfully.",
            "results_file": result_csv_path
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/simulate_cluster', methods=['POST'])
def simulate_order_cluster():
    try:
        lines_number = int(request.form.get('lines_number', 5000))
        distance_threshold = float(request.form.get('distance_threshold', 35))

        df_orderlines = pd.read_csv(DATA_PATH).head(lines_number)

        y_low, y_high = 5.5, 50
        n1, n2 = 1, 10
        list_results = [[], [], [], [], [], [], []]
        df_reswave, df_results = simulation_cluster(y_low, y_high, df_orderlines, list_results, n1, n2, distance_threshold)

        result_csv_path = os.path.join(OUTPUT_PATH, "cluster_simulation_results.csv")
        df_results.to_csv(result_csv_path, index=False)

        plot_simulation2(df_reswave, lines_number, distance_threshold)

        return jsonify({
            "status": "success",
            "message": "Cluster simulation completed successfully.",
            "results_file": result_csv_path
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    # Enable CORS for all routes
    CORS(app)