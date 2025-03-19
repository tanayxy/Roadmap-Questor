-- Create the database
CREATE DATABASE IF NOT EXISTS roadmap_questor;
USE roadmap_questor;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    level INT DEFAULT 1,
    xp INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Learning Progress table
CREATE TABLE learning_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    progress INT DEFAULT 0,
    status ENUM('not-started', 'in-progress', 'completed') DEFAULT 'not-started',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_topic (user_id, category, topic)
);

-- Quests table
CREATE TABLE quests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    xp_reward INT NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    required_actions INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Quests table (for tracking user progress on quests)
CREATE TABLE user_quests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    quest_id INT NOT NULL,
    status ENUM('not-started', 'in-progress', 'completed') DEFAULT 'not-started',
    progress INT DEFAULT 0,
    completed_actions INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quest_id) REFERENCES quests(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_quest (user_id, quest_id)
);

-- Roadmaps table
CREATE TABLE roadmaps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Custom Roadmaps table
CREATE TABLE custom_roadmaps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert initial quests
INSERT INTO quests (title, description, xp_reward, difficulty, required_actions) VALUES
('Start Your Coding Journey', 'Complete your first roadmap milestone by finishing a beginner tutorial', 100, 'easy', 3),
('First Project Completed', 'Build and deploy your first web application following a roadmap', 250, 'medium', 5),
('Hackathon Explorer', 'Register for your first hackathon using our platform''s guidance', 150, 'easy', 2),
('Skill Master', 'Complete five challenges in your chosen skill path', 300, 'medium', 5),
('Portfolio Builder', 'Create a professional portfolio with three showcased projects', 400, 'hard', 8);

-- Insert initial roadmaps
INSERT INTO roadmaps (title, description, category, difficulty) VALUES
('Frontend Web Developer', 'Comprehensive path to becoming a frontend developer', 'Frontend', 'beginner'),
('Backend Developer', 'Complete guide to backend development', 'Backend', 'beginner'),
('Full Stack Developer', 'Master both frontend and backend development', 'Full Stack', 'intermediate'); 