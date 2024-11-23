from flask import Flask, jsonify, request
import joblib
import pandas as pd
from datetime import datetime

app = Flask(__name__)

# Load the models (adjust paths as necessary)
eco_label_model = joblib.load('eco_label_model.pkl')  # Pre-trained eco-label model
inventory_model = joblib.load('./inventory_model.pkl')  # Pre-trained inventory model
label_encoders = joblib.load("label_encoders.pkl")


@app.route('/verify_eco_label', methods=['POST'])
def verify_eco_label():

    try:
        # # Extract inputs from the form
        product_id = int(request.form.get('product_id')[1:])
        manufacturer = label_encoders["Supplier"].transform([request.form.get('manufacturer')])[0]
        certificate_issuer = label_encoders["Certificate Issuer"].transform([request.form.get('certificate_issuer')])[0]
        claims_num = label_encoders["Claims"].transform([request.form.get('claims_num')])[0]
        expiry_date_str = request.form.get('days_to_expiry')
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


if __name__ == '__main__':
    app.run()
