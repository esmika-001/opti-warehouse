
# # Import libraries
# import streamlit as st
# import pandas as pd
# import numpy as np
# from prophet import Prophet
# import matplotlib.pyplot as plt
# import joblib

# # Page Configuration
# st.set_page_config(
#     page_title="Inventory Optimizer",
#     page_icon="🛒",
#     layout="centered"
# )

# # UI Design
# st.markdown("""
#     <style>
#         .main {
#             background-color: #f7f9fc;
#         }
#         h1 {
#             text-align: center;
#             color: #0078D7;
#         }
#         input {
#             text-align: center;
#         }
#         label {
#             color: #3d3d3d;
#             font-weight: bold;
#         }
#     </style>
# """, unsafe_allow_html=True)

# st.image("prediction.png", use_column_width=True)  # Replace with your logo or header image

# st.title("Inventory Optimizer")

# # Inputs from user
# month = st.text_input("Enter the Month (YYYY-MM):")
# product_id = st.text_input("Enter Product ID:")
# start_calculation = st.button("Start Calculation")

# if start_calculation:
#     # Simulate data
#     np.random.seed(42)
#     date_rng = pd.date_range(start='2020-01-01', end='2023-12-31', freq='D')
#     inventory_data = {
#         'date': date_rng,
#         'sales': np.maximum(50 + np.random.randn(len(date_rng)).cumsum(), 0)  # Simulated sales
#     }
#     data = pd.DataFrame(inventory_data)
#     data.rename(columns={'date': 'ds', 'sales': 'y'}, inplace=True)

#     # Train the Prophet model
#     model = Prophet(daily_seasonality=True)
#     model.fit(data)

#     # Save the trained model as a .pkl file
#     joblib.dump(model, "prep.pkl")

#     # Prediction range based on user input
#     if month:
#         try:
#             future_start_date = f"{month}-01"
#             future_end_date = pd.to_datetime(future_start_date) + pd.DateOffset(months=1)
#             prediction_period = pd.date_range(start=future_start_date, end=future_end_date, freq='D')

#             # Create future DataFrame and forecast
#             future = pd.DataFrame({"ds": prediction_period})
#             forecast = model.predict(future)

#             # Display predicted stock for the first date
#             predicted_stock = forecast.iloc[0]['yhat']
#             st.success(f"Predicted Stock for {future_start_date}: {int(predicted_stock)}")

#             # Plot sales forecast
#             fig, ax = plt.subplots(figsize=(10, 6))
#             model.plot(forecast, ax=ax)
#             ax.set_title("Sales Prediction", fontsize=16)
#             st.pyplot(fig)

#             # Option to download the model
#             with open("prep.pkl", "rb") as f:
#                 st.download_button("Download Trained Model", f, file_name="prep.pkl")
#         except Exception as e:
#             st.error(f"Error: {e}")
#     else:
#         st.warning("Please enter a valid month.")

# Import libraries
import streamlit as st
import pandas as pd
import numpy as np
from prophet import Prophet
import matplotlib.pyplot as plt
import joblib
import os

# Page Configuration
st.set_page_config(
    page_title="Inventory Optimizer",
    page_icon="🛒",
    layout="centered"
)

# UI Design
st.markdown("""
    <style>
        .main {
            background-color: #f7f9fc;
        }
        h1 {
            text-align: center;
            color: #0078D7;
        }
        input {
            text-align: center;
        }
        label {
            color: #3d3d3d;
            font-weight: bold;
        }
    </style>
""", unsafe_allow_html=True)

# st.title("Inventory Optimizer")
st.markdown("<h1 style='text-align: center;'>🛒 Inventory Optimizer</h1>", unsafe_allow_html=True)
# Inputs from user
month = st.text_input("Enter the Month (YYYY-MM):")
product_id = st.text_input("Enter Product ID:")
start_calculation = st.button("Start Calculation")

# Path to the model file
model_path = r"D:\c program\sambhav\New folder\prep.pkl"

if start_calculation:
    # Check if the model exists
    if os.path.exists(model_path):
        st.info("Loading the existing trained model...")
        try:
            model = joblib.load(model_path)
        except Exception as e:
            st.error(f"Error loading model: {e}")
            st.stop()
    else:
        st.info("Training a new model as no existing model is found...")
        # Simulate data
        np.random.seed(42)
        date_rng = pd.date_range(start='2020-01-01', end='2023-12-31', freq='D')
        inventory_data = {
            'date': date_rng,
            'sales': np.maximum(50 + np.random.randn(len(date_rng)).cumsum(), 0)  # Simulated sales
        }
        data = pd.DataFrame(inventory_data)
        data.rename(columns={'date': 'ds', 'sales': 'y'}, inplace=True)

        # Train the Prophet model
        model = Prophet(daily_seasonality=True)
        model.fit(data)

        # Save the trained model
        joblib.dump(model, model_path)

    # Prediction range based on user input
    if month:
        try:
            future_start_date = f"{month}-01"
            future_end_date = pd.to_datetime(future_start_date) + pd.DateOffset(months=1)
            prediction_period = pd.date_range(start=future_start_date, end=future_end_date, freq='D')

            # Create future DataFrame and forecast
            future = pd.DataFrame({"ds": prediction_period})
            forecast = model.predict(future)

            # Display predicted stock for the first date
            predicted_stock = forecast.iloc[0]['yhat']
            st.success(f"Predicted Stock for {future_start_date}: {int(predicted_stock)}")

            # Plot sales forecast
            fig, ax = plt.subplots(figsize=(10, 6))
            model.plot(forecast, ax=ax)
            ax.set_title("Sales Prediction", fontsize=16)
            st.pyplot(fig)

            # Option to download the model
            with open(model_path, "rb") as f:
                st.download_button("Download Trained Model", f, file_name="prep.pkl")
        except Exception as e:
            st.error(f"Error during prediction: {e}")
    else:
        st.warning("Please enter a valid month.")

