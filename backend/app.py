from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI
import mysql.connector
import bcrypt
import jwt
from functools import wraps
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME')
    )

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        try:
            token = token.split(' ')[1]
            data = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=["HS256"])
            current_user = data
        except:
            return jsonify({'error': 'Token is invalid'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/')
def home():
    return "Roadmap Questor API"

# User registration
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not all([username, email, password]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if user already exists
        cursor.execute('SELECT id FROM users WHERE email = %s OR username = %s', (email, username))
        if cursor.fetchone():
            return jsonify({'error': 'User already exists'}), 400

        # Insert new user
        cursor.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)',
            (username, email, hashed_password.decode('utf-8'))
        )
        conn.commit()
        user_id = cursor.lastrowid

        cursor.close()
        conn.close()

        return jsonify({
            'message': 'User registered successfully',
            'userId': user_id
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# User login
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not all([email, password]):
            return jsonify({'error': 'Missing required fields'}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get user
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()

        if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            return jsonify({'error': 'Invalid credentials'}), 401

        # Generate token
        token = jwt.encode({
            'id': user['id'],
            'email': user['email'],
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, os.getenv('JWT_SECRET'))

        cursor.close()
        conn.close()

        return jsonify({
            'token': token,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'username': user['username']
            }
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get user progress
@app.route('/api/progress', methods=['GET'])
@token_required
def get_progress(current_user):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get learning progress
        cursor.execute('SELECT * FROM learning_progress WHERE user_id = %s', (current_user['id'],))
        learning_progress = cursor.fetchall()

        # Get user quests
        cursor.execute('''
            SELECT uq.*, q.title, q.description, q.xp_reward, q.difficulty, q.required_actions 
            FROM user_quests uq 
            JOIN quests q ON uq.quest_id = q.id 
            WHERE uq.user_id = %s
        ''', (current_user['id'],))
        user_quests = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify({
            'learningProgress': learning_progress,
            'quests': user_quests
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Update learning progress
@app.route('/api/progress/learning', methods=['POST'])
@token_required
def update_learning_progress(current_user):
    try:
        data = request.get_json()
        category = data.get('category')
        topic = data.get('topic')
        progress = data.get('progress')
        status = data.get('status')

        if not all([category, topic, progress, status]):
            return jsonify({'error': 'Missing required fields'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO learning_progress (user_id, category, topic, progress, status) 
            VALUES (%s, %s, %s, %s, %s) 
            ON DUPLICATE KEY UPDATE progress = %s, status = %s
        ''', (current_user['id'], category, topic, progress, status, progress, status))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Progress updated successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Update quest progress
@app.route('/api/progress/quest', methods=['POST'])
@token_required
def update_quest_progress(current_user):
    try:
        data = request.get_json()
        quest_id = data.get('questId')
        progress = data.get('progress')
        completed_actions = data.get('completedActions')
        status = data.get('status')

        if not all([quest_id, progress, completed_actions, status]):
            return jsonify({'error': 'Missing required fields'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO user_quests (user_id, quest_id, progress, completed_actions, status) 
            VALUES (%s, %s, %s, %s, %s) 
            ON DUPLICATE KEY UPDATE progress = %s, completed_actions = %s, status = %s
        ''', (current_user['id'], quest_id, progress, completed_actions, status, 
              progress, completed_actions, status))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Quest progress updated successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-idea', methods=['POST'])
def generate_idea():
    try:
        theme = request.json.get('theme')
        if not theme:
            return jsonify({'error': 'Theme is required'}), 400

        prompt = f"""Generate a unique and innovative hackathon project idea based on the theme: {theme}.
        
        Please provide a structured response including:
        1. Project Concept:
            - Core idea and purpose
            - Main features and functionality
            - Target users

        2. Technical Implementation:
            - Key technologies and frameworks to use
            - Basic architecture overview
            - Important APIs or services to integrate

        3. Innovation & Impact:
            - What makes this project unique
            - Potential real-world impact
            - Future expansion possibilities

        4. Implementation Plan:
            - Key components to build first
            - Suggested timeline for 24-48 hour hackathon
            - Potential challenges to consider

        Make it specific, feasible for a hackathon timeframe (24-48 hours), and innovative."""

        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a hackathon project idea generator. You provide innovative, feasible, and well-structured project ideas that can be implemented within 24-48 hours."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        return jsonify({
            'idea': response.choices[0].message.content
        })
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to generate idea'}), 500

@app.route('/api/generate-roadmap', methods=['POST'])
def generate_roadmap():
    try:
        print("=== Starting roadmap generation ===")
        api_key = os.getenv('OPENAI_API_KEY')
        print(f"API Key available: {'Yes' if api_key else 'No'}")
        print(f"API Key first few chars: {api_key[:5]}...")
        
        print("Making request to OpenAI...")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates career roadmaps."},
                {"role": "user", "content": "Give me a very brief 3-step roadmap for becoming a software developer."}
            ],
            temperature=0.7,
            max_tokens=150
        )
        
        generated_text = response.choices[0].message.content
        print("\nGenerated response from OpenAI:")
        print(generated_text)
        print("\n=== Generation complete ===")
        
        return jsonify({
            'roadmap': generated_text
        })
    except Exception as e:
        print(f"\n=== Error occurred ===")
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {str(e)}")
        print(f"=== Error details end ===\n")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
