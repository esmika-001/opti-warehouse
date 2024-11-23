# import streamlit as st
# import pickle
# import numpy as np
# from PIL import Image

# # Load the model
# model_path = "eco_label_verifier_model.pkl"
# try:
#     with open(model_path, "rb") as f:
#         model = pickle.load(f)
#     st.write("Model loaded successfully!")
# except Exception as e:
#     st.error(f"Error loading model: {e}")
#     st.stop()

# # Constants
# IMG_HEIGHT = 128
# IMG_WIDTH = 128

# # Streamlit app configuration
# st.set_page_config(page_title="Eco Label Verifier", page_icon="🌱", layout="centered")

# # Header Section
# st.markdown(
#     """
#     <style>
#     .main-header {
#         background-color: #00796b;
#         color: white;
#         padding: 10px;
#         text-align: center;
#         border-radius: 5px;
#     }
#     </style>
#     """,
#     unsafe_allow_html=True,
# )

# st.markdown('<div class="main-header"><h1>Eco Label Verifier</h1></div>', unsafe_allow_html=True)

# # Input Section
# st.subheader("Information")

# product_id = st.text_input("Product ID", placeholder="Enter product ID")
# certificate_issuer = st.selectbox("Certificate Issued By", ["Select", "CertifiedOrg", "Other"])
# claims = st.text_area("Claims", placeholder="Enter product claims")
# supplier = st.text_input("Supplier", placeholder="Enter supplier name")
# expiration_date = st.text_input("Expiration Date of Certificate", placeholder="YYYY-MM-DD")

# uploaded_file = st.file_uploader("Upload Your Certificate", type=["jpg", "png", "jpeg"])

# # Submit Button
# if st.button("Submit"):
#     if not uploaded_file:
#         st.error("Please upload an eco-label image.")
#     elif not all([product_id, certificate_issuer, claims, supplier, expiration_date]) or certificate_issuer == "Select":
#         st.error("Please fill all the fields and select a valid certificate issuer.")
#     else:
#         try:
#             # Process the uploaded image
#             image = Image.open(uploaded_file)
#             image = image.resize((IMG_HEIGHT, IMG_WIDTH))  # Resize image
#             image_array = np.array(image).flatten() / 255.0  # Flatten and normalize image

#             # Make prediction
#             prediction = model.predict([image_array])[0]  # Assuming binary classification
#             label = "Genuine" if prediction == 1 else "Fake"

#             # Display result
#             st.subheader("Results")
#             if label == "Genuine":
#                 st.success("✅ The eco-label is Genuine.")
#             else:
#                 st.error("❌ The eco-label is Fake.")
#         except Exception as e:
#             st.error(f"An error occurred during prediction: {e}")

import streamlit as st
import pandas as pd
import joblib
from datetime import datetime

# Load model and encoders
model = joblib.load("eco_label_verifier_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")

# App title
st.title("Eco Label Verifier")

# Form inputs
st.subheader("Enter Certificate Information")
product_id = st.text_input("Product ID")
certificate_issuer = st.selectbox("Certificate Issued By", ["Org A", "Org B", "Org C"])
claims = st.text_input("Claims")
supplier = st.text_input("Supplier")
expiration_date = st.date_input("Expiration Date of Certificate")

# Submit button
if st.button("Submit"):
    # Preprocess inputs
    try:
        product_id_num = int(product_id[1:])  # Extract numeric part of product ID
        certificate_issuer_num = label_encoders["Certificate Issuer"].transform([certificate_issuer])[0]
        claims_num = label_encoders["Claims"].transform([claims])[0]
        supplier_num = label_encoders["Supplier"].transform([supplier])[0]
        days_to_expiry = (expiration_date - datetime.today().date()).days
        
        # Predict
        input_data = pd.DataFrame([[product_id_num, certificate_issuer_num, claims_num, supplier_num, days_to_expiry]],
                                  columns=["Product ID", "Certificate Issuer", "Claims", "Supplier", "Days to Expiry"])
        prediction = model.predict(input_data)[0]
        
        # Output
        if prediction == 1:
            st.success("The certificate is VALID!")
        else:
            st.error("The certificate is INVALID!")
    except Exception as e:
        st.error(f"Error in prediction: {e}")
