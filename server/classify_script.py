import joblib

# Load the pre-trained model
loaded_model = joblib.load('dark_model.pkl')


# Function to predict the category of input text
def predict_category(patterns_list: list[str]) -> bool:
    for pattern in patterns_list:
        prediction = loaded_model.predict([pattern])
        if prediction == 2:
            continue
        else:
            return True       # return True if the Model detected it is using dark pattern
    return False        # return False if the Model detected it is not using a dark pattern
