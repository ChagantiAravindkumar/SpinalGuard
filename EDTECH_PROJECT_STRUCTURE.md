# AI-Powered EdTech Learning Platform

## Production System Architecture

### Project Overview
- **Frontend**: Modern AI-powered LMS with voice tutor
- **Backend**: Scalable API with AI integration
- **Database**: Multi-tier data architecture
- **Real-time**: WebSocket for voice streaming

---

## Folder Structure

```
edtech-platform/
│
├── frontend/                 # Next.js Frontend
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   ├── voice-tutor/
│   │   ├── lessons/
│   │   ├── quiz/
│   │   ├── pronunciation/
│   │   ├── reports/
│   │   ├── teacher/
│   │   └── auth/
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   ├── voice/
│   │   ├── quiz/
│   │   ├── charts/
│   │   ├── lessons/
│   │   ├── ui/
│   │   └── shared/
│   │
│   ├── hooks/
│   │   ├── useVoiceRecorder.ts
│   │   ├── usePronunciationScore.ts
│   │   └── useAdaptiveContent.ts
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── voice.ts
│   │   ├── auth.ts
│   │   └── analytics.ts
│   │
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── lessonStore.ts
│   │   ├── voiceStore.ts
│   │   └── uiStore.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── theme.css
│   │   └── animations.css
│   │
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── constants.ts
│   │   └── validators.ts
│   │
│   ├── public/
│   ├── .env.local
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                  # Node.js/Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── env.ts
│   │   │   └── ai.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── lessonController.ts
│   │   │   ├── voiceController.ts
│   │   │   ├── quizController.ts
│   │   │   └── analyticsController.ts
│   │   │
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── aiService.ts
│   │   │   ├── pronunciationService.ts
│   │   │   ├── adaptiveService.ts
│   │   │   └── analyticsService.ts
│   │   │
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Lesson.ts
│   │   │   ├── Quiz.ts
│   │   │   ├── VoiceSession.ts
│   │   │   ├── Progress.ts
│   │   │   └── Pronunciation.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── lessons.ts
│   │   │   ├── voice.ts
│   │   │   ├── quiz.ts
│   │   │   ├── analytics.ts
│   │   │   └── health.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── validation.ts
│   │   │   └── rateLimit.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   ├── jwt.ts
│   │   │   └── validators.ts
│   │   │
│   │   ├── websocket/
│   │   │   ├── voiceGateway.ts
│   │   │   └── handlers.ts
│   │   │
│   │   └── app.ts
│   │
│   ├── tests/
│   ├── .env
│   ├── tsconfig.json
│   ├── package.json
│   └── Dockerfile
│
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── DATABASE_SCHEMA.md
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── LICENSE
```

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | Next.js 14 + TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animations** | Framer Motion |
| **State Management** | Zustand |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Voice UI** | Wavesurfer.js |
| **HTTP Client** | Axios |
| **Notifications** | React Hot Toast |
| **Backend** | Node.js + Express + TypeScript |
| **Real-time** | Socket.io |
| **Database** | PostgreSQL + Redis |
| **ORM** | Prisma |
| **Auth** | JWT + Passport.js |
| **AI/ML** | OpenAI API, Google Cloud Speech-to-Text |
| **Deployment** | Docker + K8s or Vercel + Railway |

---

## Key Features Architecture

### 1. Voice Tutor System
- Real-time audio streaming via WebSocket
- Speech-to-text conversion
- AI response generation
- Text-to-speech playback
- Waveform visualization

### 2. Adaptive Learning
- Content difficulty adjustment based on performance
- Topic mastery tracking
- Personalized recommendations
- Learning path optimization

### 3. Pronunciation Scoring
- Phoneme-level analysis
- Real-time feedback
- Score calculation
- Progress tracking

### 4. Analytics Engine
- Daily/weekly/monthly progress
- Topic mastery heatmap
- Weak area identification
- Teacher insights

### 5. Quiz Engine
- AI-generated questions
- Multi-type questions (MCQ, Short answer, etc.)
- Adaptive difficulty
- Performance analytics

---

## Database Schema (Simplified)

### Users Table
```sql
- id (PK)
- email (UNIQUE)
- passwordHash
- fullName
- role (student/teacher/parent)
- language (hindi/telugu/english)
- createdAt
- updatedAt
```

### Lessons Table
```sql
- id (PK)
- subjectId (FK)
- title
- content
- difficulty
- examples
- voiceNarration
- createdAt
```

### Progress Table
```sql
- id (PK)
- userId (FK)
- lessonId (FK)
- status (in_progress/completed)
- mastery (0-100)
- completedAt
```

### VoiceSessions Table
```sql
- id (PK)
- userId (FK)
- startTime
- endTime
- transcriptStudent
- transcriptAI
- embeddings
- createdAt
```

### Pronunciation Table
```sql
- id (PK)
- userId (FK)
- word
- audio_url
- score (0-100)
- phonemeBreakdown (JSON)
- createdAt
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Lessons
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons/:id/start` - Start lesson
- `POST /api/lessons/:id/complete` - Complete lesson

### Voice Tutor
- `WS /ws/voice` - WebSocket for voice streaming
- `POST /api/voice/transcribe` - Transcribe audio
- `POST /api/voice/response` - Get AI response

### Pronunciation
- `POST /api/pronunciation/score` - Score pronunciation
- `GET /api/pronunciation/history` - Get pronunciation history

### Quiz
- `GET /api/quiz/:subjectId` - Get quiz
- `POST /api/quiz/:id/submit` - Submit quiz

### Analytics
- `GET /api/analytics/progress` - Get progress
- `GET /api/analytics/mastery` - Get mastery map
- `GET /api/analytics/weak-areas` - Weak areas

### Teacher
- `GET /api/teacher/students` - List students
- `GET /api/teacher/analytics/:studentId` - Student analytics

---

## Scalability & Performance

### Frontend Optimization
- Code splitting with Next.js
- Image optimization with next/image
- CSS-in-JS tree shaking
- Service workers for offline support
- CDN caching

### Backend Optimization
- Database indexing on frequently queried fields
- Redis caching for lessons/quizzes
- Load balancing with nginx
- Horizontal scaling with Docker
- Connection pooling

### Voice Processing
- Audio compression before transmission
- Streaming to avoid latency
- WebRTC for low-latency communication
- Queue processing for AI responses

### Data Privacy
- End-to-end encryption for voice data
- GDPR compliance
- Data anonymization
- Secure API endpoints with rate limiting

---

## Deployment Strategy

### Production Deployment
- Docker containerization
- Kubernetes orchestration
- CI/CD with GitHub Actions
- Database backups
- CDN for static assets
- Load balancing

### Environment Configuration
- Development: Local with docker-compose
- Staging: AWS/GCP staging environment
- Production: Kubernetes cluster

---

## Development Roadmap

### Phase 1 (MVP)
- Landing page
- Authentication
- Dashboard
- Lesson viewer
- Basic quiz

### Phase 2
- Voice tutor
- Pronunciation scoring
- Adaptive content
- Analytics

### Phase 3
- Teacher dashboard
- Parent portal
- Advanced analytics
- Mobile app

---

## Design Philosophy

1. **User-First**: Every decision based on user experience
2. **Performance**: <3s initial load, <100ms interactions
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Scalability**: Architecture supports 1M+ users
5. **Privacy**: Zero-trust security model
6. **AI Integration**: Seamless AI/human interaction
