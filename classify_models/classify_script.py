# Import necessary libraries
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# Load the pre-trained model
loaded_model = joblib.load('dark_model.pkl')

# Function to predict the category of input text
def predict_category(input_text):
    prediction = loaded_model.predict([input_text])
    if(prediction==2):
      return 0
    return 1
#0 => "Not a Dark Pattern"
