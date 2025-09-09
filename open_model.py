import joblib

print("🚀 Script started")

# Load the model from the .pkl file
model = joblib.load("psal_1.pkl")  # or full path if needed
print("✅ Model loaded successfully")

# Check the type of the model
print("🤖 Model type:", type(model))

# Show first 20 attributes/methods of the model
print("🔍 Available methods/attributes:", dir(model)[:20])

# Try a sample prediction (replace with your actual input format)
try:
    features = [[25.0, 1000.0]]  # example input
    prediction = model.predict(features)
    print("📊 Sample prediction:", prediction)
except Exception as e:
    print("⚠️ Prediction failed:", e)

print("🏁 Script finished")

