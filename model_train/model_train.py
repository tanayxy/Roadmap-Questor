import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

# Load the dataset
df = pd.read_csv("varied_frontend_hackathon_project_recommendation.csv")

# Combine relevant columns for training
X_text = df['Project_Theme'] + ' ' + df['Tech_Stack']
y = df['Project_Idea']

# Convert text data into numerical features
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(X_text)

# Encode target labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Split dataset into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=300, max_depth=10, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'recommendation_model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

# Function for recommending project ideas based on theme and tech stack
def recommend_projects(theme, tech_stack):
    input_text = theme + ' ' + tech_stack
    input_features = vectorizer.transform([input_text])
    predictions = model.predict_proba(input_features)[0]
    top_indices = np.argsort(predictions)[-5:][::-1]  # Get top 5 project recommendations
    recommended_projects = label_encoder.inverse_transform(top_indices)
    return recommended_projects.tolist()

# Function to describe a selected project
def describe_project(project_name):
    project_row = df[df['Project_Idea'] == project_name]
    if not project_row.empty:
        description = project_row.iloc[0]["Project_Idea"]
        tech_stack = project_row.iloc[0]["Tech_Stack"]
        difficulty = project_row.iloc[0]["Project_Difficulty"]
        return f"Project: {description}\nTech Stack: {tech_stack}\nDifficulty: {difficulty}"
    return "Project description not available."

# Main Function
if __name__ == "__main__":
    theme = input("Enter your project theme: ")
    tech_stack = input("Enter your preferred tech stack: ")
    recommended_projects = recommend_projects(theme, tech_stack)

    if recommended_projects:
        print("\nHere are some recommended project ideas:")
        for idx, project in enumerate(recommended_projects):
            print(f"{idx + 1}. {project}")

        choice = int(input("\nChoose a project number to get more details: "))
        if 1 <= choice <= len(recommended_projects):
            project_name = recommended_projects[choice - 1]
            project_description = describe_project(project_name)
            print(f"\nProject Details:\n{project_description}")
        else:
            print("Invalid selection.")
    else:
        print("No recommendations available for the given theme and tech stack.")