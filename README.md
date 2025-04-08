# OasisApps.ai - AI Video Content Automation Platform

## Overview

OasisApps.ai is a comprehensive dashboard for managing AI-powered video content creation and social media publishing workflows. The platform allows users to generate, customize, and schedule content with their own API integrations.

## Backend Setup

### Database Configuration

The application requires a MySQL database. Here are the required tables:

#### 1. `users` Table

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  avatar VARCHAR(255) NULL
);
```

#### 2. `auth_tokens` Table

```sql
CREATE TABLE auth_tokens (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### 3. `api_keys` Table

```sql
CREATE TABLE api_keys (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  api_key TEXT NOT NULL,
  last_tested TIMESTAMP NULL,
  status ENUM('untested', 'success', 'failed') DEFAULT 'untested',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, provider)
);
```

#### 4. `videos` Table

```sql
CREATE TABLE videos (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  category VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  visual_prompt TEXT NOT NULL,
  style VARCHAR(50) NOT NULL,
  status ENUM('processing', 'completed', 'failed') DEFAULT 'processing',
  url VARCHAR(255) NULL,
  thumbnail_url VARCHAR(255) NULL,
  duration INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### 5. `social_accounts` Table

```sql
CREATE TABLE social_accounts (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  username VARCHAR(255) NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NULL,
  token_expires_at TIMESTAMP NULL,
  connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'expired', 'revoked') DEFAULT 'active',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, platform)
);
```

#### 6. `scheduled_posts` Table

```sql
CREATE TABLE scheduled_posts (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  video_id VARCHAR(36) NULL,
  platform VARCHAR(50) NOT NULL,
  content TEXT NULL,
  scheduled_time TIMESTAMP NOT NULL,
  status ENUM('pending', 'published', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE SET NULL
);
```

### Backend Dependencies

The backend requires the following dependencies:

1. **Node.js & Express.js**
   - Core framework for the API server
   - `npm install express cors body-parser helmet`

2. **MySQL**
   - Database for storing user data, videos, and scheduling information
   - `npm install mysql2`

3. **Authentication**
   - JWT for token-based authentication
   - `npm install jsonwebtoken bcrypt`

4. **API Integration Libraries**
   - OpenAI API for content generation
   - `npm install openai`
   - ElevenLabs for voice synthesis
   - `npm install elevenlabs-node`

5. **Video Processing**
   - FFmpeg for video processing (server installation required)
   - Node.js wrapper: `npm install fluent-ffmpeg`

6. **Social Media APIs**
   - YouTube API: `npm install googleapis`
   - TikTok API: Custom implementation required
   - Instagram API: `npm install instagram-private-api`

7. **Scheduling**
   - Cron jobs for scheduled content creation and publishing
   - `npm install node-cron`

8. **Environment Variables**
   - `npm install dotenv`

## Video Generation Flow

The video generation process in OasisApps.ai follows these steps:

### 1. Content Generation

The process begins with selecting a content category and generating a quote or script. This is handled by the OpenAI API, which receives the category as input and returns appropriate content.

```javascript
// Example API endpoint implementation
app.post('/api/video/generate', async (req, res) => {
  const { type, category, content } = req.body;
  
  if (type === 'quote') {
    // Generate quote using OpenAI
    const quote = await openaiService.generateQuote(category);
    return res.json({ content: quote });
  }
  
  // Other generation types...
});
```

### 2. Visual Prompt Creation

After content generation, a visual prompt is created to guide the video's visual elements. This can be generated automatically based on the content or provided by the user.

```javascript
// Visual prompt generation
if (type === 'visual_prompt') {
  const visualPrompt = await openaiService.generateVisualPrompt(content, category);
  return res.json({ content: visualPrompt });
}
```

### 3. Video Rendering

The final step combines the content and visual prompt with the selected style to render the video. This process involves:

1. Text-to-speech conversion using ElevenLabs
2. Visual generation based on the prompt
3. Combining audio and visuals using FFmpeg

```javascript
// Video rendering process
if (type === 'video') {
  // Create a job in the database
  const videoId = uuidv4();
  await db.query('INSERT INTO videos (id, user_id, title, category, content, visual_prompt, style, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [videoId, userId, `${category} video`, category, content, visual_prompt, style, 'processing']);
  
  // Start async processing
  videoProcessingQueue.add({
    videoId,
    userId,
    content,
    visualPrompt: visual_prompt,
    style
  });
  
  return res.json({ id: videoId });
}
```

### 4. Processing Queue

Video generation is handled asynchronously through a processing queue:

```javascript
// Video processing worker
videoProcessingQueue.process(async (job) => {
  const { videoId, userId, content, visualPrompt, style } = job.data;
  
  try {
    // 1. Generate audio from content using ElevenLabs
    const audioPath = await elevenLabsService.generateSpeech(content);
    
    // 2. Generate video frames based on visual prompt and style
    const videoFramesPath = await videoGenerationService.generateFrames(visualPrompt, style);
    
    // 3. Combine audio and video frames using FFmpeg
    const outputPath = await videoProcessingService.combineAudioAndVideo(audioPath, videoFramesPath);
    
    // 4. Upload to storage and get URL
    const url = await storageService.uploadVideo(outputPath, videoId);
    
    // 5. Update database with completed video URL
    await db.query('UPDATE videos SET status = ?, url = ? WHERE id = ?', 
      ['completed', url, videoId]);
      
    return { status: 'completed', url };
  } catch (error) {
    // Update database with failure status
    await db.query('UPDATE videos SET status = ? WHERE id = ?', 
      ['failed', videoId]);
    throw error;
  }
});
```

### 5. Status Polling

The frontend polls for video status updates:

```javascript
app.get('/api/video/generate/:id/status', async (req, res) => {
  const { id } = req.params;
  
  const [video] = await db.query('SELECT status, url FROM videos WHERE id = ?', [id]);
  
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  // Calculate progress based on status
  let progress = 0;
  if (video.status === 'processing') {
    // In a real implementation, you might have more granular progress tracking
    progress = 50;
  } else if (video.status === 'completed') {
    progress = 100;
  }
  
  return res.json({
    status: video.status,
    progress,
    url: video.url
  });
});
```

## API Endpoints

The frontend is configured to communicate with these backend endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Verify authentication token

### API Keys
- `GET /api/keys` - Get user's API keys
- `POST /api/keys` - Save API keys
- `POST /api/keys/test` - Test API key validity

### Video Management
- `POST /api/video/generate` - Generate content or video
- `GET /api/video/generate/:id/status` - Check video generation status
- `GET /api/video/list` - List user's videos
- `DELETE /api/video/delete/:id` - Delete a video

### Social Media
- `GET /api/social/list` - List connected social accounts
- `POST /api/social/connect` - Connect a social account
- `POST /api/social/disconnect` - Disconnect a social account

### Admin
- `GET /api/admin/users` - List all users (admin only)
- `POST /api/admin/users` - Create a new user (admin only)
- `PUT /api/admin/users/:id` - Update a user (admin only)
- `DELETE /api/admin/users/:id` - Delete a user (admin only)

## Getting Started

1. Set up the MySQL database and create the required tables
2. Install backend dependencies
3. Configure environment variables in a `.env` file
4. Implement the API endpoints
5. Connect the frontend to your backend

## Environment Variables

Create a `.env` file with the following variables:

```
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=oasisapps

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# API Keys
OPENAI_API_KEY=your_openai_key
ELEVENLABS_API_KEY=your_elevenlabs_key

# Storage
STORAGE_BUCKET=your_storage_bucket

# Social Media
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret

# Server
PORT=3000
NODE_ENV=development
```

This README provides a comprehensive guide to setting up the backend for the OasisApps.ai platform. Follow these instructions to connect the frontend to a fully functional backend system.