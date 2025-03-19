const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'roadmap_questor',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes
// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Get user progress
app.get('/api/progress', authenticateToken, async (req, res) => {
  try {
    const [learningProgress] = await pool.execute(
      'SELECT * FROM learning_progress WHERE user_id = ?',
      [req.user.id]
    );
    
    const [userQuests] = await pool.execute(
      `SELECT uq.*, q.title, q.description, q.xp_reward, q.difficulty, q.required_actions 
       FROM user_quests uq 
       JOIN quests q ON uq.quest_id = q.id 
       WHERE uq.user_id = ?`,
      [req.user.id]
    );
    
    res.json({
      learningProgress,
      quests: userQuests
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching progress' });
  }
});

// Update learning progress
app.post('/api/progress/learning', authenticateToken, async (req, res) => {
  try {
    const { category, topic, progress, status } = req.body;
    
    await pool.execute(
      `INSERT INTO learning_progress (user_id, category, topic, progress, status) 
       VALUES (?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE progress = ?, status = ?`,
      [req.user.id, category, topic, progress, status, progress, status]
    );
    
    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating progress' });
  }
});

// Update quest progress
app.post('/api/progress/quest', authenticateToken, async (req, res) => {
  try {
    const { questId, progress, completedActions, status } = req.body;
    
    await pool.execute(
      `INSERT INTO user_quests (user_id, quest_id, progress, completed_actions, status) 
       VALUES (?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE progress = ?, completed_actions = ?, status = ?`,
      [req.user.id, questId, progress, completedActions, status, progress, completedActions, status]
    );
    
    res.json({ message: 'Quest progress updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating quest progress' });
  }
});

// Create custom roadmap
app.post('/api/roadmaps/custom', authenticateToken, async (req, res) => {
  try {
    const { title, description, technologies } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO custom_roadmaps (user_id, title, description, technologies) VALUES (?, ?, ?, ?)',
      [req.user.id, title, description, JSON.stringify(technologies)]
    );
    
    res.status(201).json({ message: 'Custom roadmap created successfully', roadmapId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating custom roadmap' });
  }
});

// Get user's custom roadmaps
app.get('/api/roadmaps/custom', authenticateToken, async (req, res) => {
  try {
    const [roadmaps] = await pool.execute(
      'SELECT * FROM custom_roadmaps WHERE user_id = ?',
      [req.user.id]
    );
    
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching custom roadmaps' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 