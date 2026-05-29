```markdown
# Architecture Documentation

## System Overview

The AI-Powered EdTech Learning Platform is built with a modern microservices-ready architecture designed for scalability, performance, and maintainability.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
├──────────────────┬────────────────────┬────────────────────┤
│  Web Browser     │   Mobile App       │   API Clients      │
│  (Next.js SPA)   │   (React Native)   │   (Third-party)    │
└────────┬─────────┴─────────┬──────────┴─────────┬──────────┘
         │                   │                     │
         └───────────────────┼─────────────────────┘
                             │ HTTPS/WSS
┌────────────────────────────▼────────────────────────────────┐
│                    CDN / LOAD BALANCER                      │
│              (Vercel / CloudFlare / Nginx)                  │
└────────────────────────────┬────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                     │
┌───────▼───────┐  ┌────────▼────────┐  ┌────────▼────────┐
│   Frontend     │  │    API         │  │  WebSocket      │
│   (Next.js)    │  │   Gateway      │  │  (Socket.io)    │
│                │  │ (Express.js)   │  │                 │
└────────────────┘  └────────┬────────┘  └────────┬────────┘
                             │                     │
        ┌────────────────────┼─────────────────────┘
        │                    │
        │         ┌──────────▼──────────┐
        │         │   AUTHENTICATION   │
        │         │   (JWT / OAuth)    │
        │         └────────────────────┘
        │
┌───────▼──────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                      │
├────────────────┬─────────────────┬──────────────┬────────────┤
│  Lesson        │  Voice Tutor    │  Quiz        │  Analytics │
│  Service       │  Service        │  Service     │  Service   │
│                │                 │              │            │
│  • Content     │  • Transcribe   │  • Generate  │  • Track   │
│  • Adaptive    │  • AI Response  │  • Validate  │  • Report  │
│  • Delivery    │  • Pronunciation│  • Score     │  • Predict │
└────────────────┴─────────────────┴──────────────┴────────────┘
        │                │               │              │
        └────────────────┼───────────────┼──────────────┘
                         │
        ┌────────────────┴───────────────┐
        │                                 │
┌───────▼──────────────┐    ┌────────────▼────────────┐
│    PRIMARY DATABASE  │    │   CACHE LAYER          │
│    (PostgreSQL)      │    │   (Redis)              │
│                      │    │                        │
│ • Users             │    │ • Sessions             │
│ • Lessons           │    │ • Lessons              │
│ • Progress          │    │ • Quizzes              │
│ • Analytics         │    │ • User Data            │
└──────────────────────┘    └────────────────────────┘
        │                            │
        └────────────────┬───────────┘
                         │
        ┌────────────────▼───────────────┐
        │   EXTERNAL SERVICES            │
        ├────────────────┬───────────────┤
        │  AI Services   │  Voice APIs   │
        │  • OpenAI GPT  │  • Google STT │
        │  • Embeddings  │  • TTS        │
        └────────────────┴───────────────┘
```

---

## Frontend Architecture

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts**: Recharts
- **API Client**: Axios
- **Real-time**: Socket.io Client

### Folder Structure
```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Protected routes
│   ├── voice-tutor/       # Voice interaction UI
│   ├── lessons/           # Lesson pages
│   ├── quiz/              # Quiz interface
│   ├── auth/              # Authentication pages
│   └── reports/           # Analytics dashboards
│
├── src/
│   ├── components/        # React components
│   │   ├── dashboard/
│   │   ├── voice/
│   │   ├── lessons/
│   │   ├── quiz/
│   │   ├── charts/
│   │   └── ui/
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── useVoiceRecorder.ts
│   │   ├── usePronunciationScore.ts
│   │   └── useAdaptiveContent.ts
│   │
│   ├── services/          # API integration
│   │   ├── api.ts         # Axios instance
│   │   ├── auth.ts
│   │   ├── lessons.ts
│   │   ├── voice.ts
│   │   └── analytics.ts
│   │
│   ├── store/             # Zustand stores
│   │   ├── authStore.ts
│   │   ├── lessonStore.ts
│   │   ├── voiceStore.ts
│   │   └── uiStore.ts
│   │
│   ├── styles/            # Global styles
│   │   ├── globals.css
│   │   ├── theme.css
│   │   └── animations.css
│   │
│   ├── utils/             # Utility functions
│   │   ├── cn.ts
│   │   ├── constants.ts
│   │   └── validators.ts
│   │
│   └── types/             # TypeScript types
│       ├── lesson.ts
│       ├── user.ts
│       └── analytics.ts
│
├── public/                # Static assets
├── .env.local            # Environment variables
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

### Key Features
1. **Server-Side Rendering**: Fast initial page load
2. **Client-Side Navigation**: Smooth page transitions
3. **Code Splitting**: Automatic route-based splitting
4. **Image Optimization**: Next.js Image component
5. **API Routes**: Optional backend proxying
6. **Static Generation**: Pre-render for performance

---

## Backend Architecture

### Technology Stack
- **Framework**: Express.js
- **Language**: TypeScript
- **Real-time**: Socket.io
- **Database**: PostgreSQL (with Prisma ORM)
- **Caching**: Redis
- **Authentication**: JWT
- **Validation**: Joi/Zod
- **Logging**: Pino

### Folder Structure
```
backend/
├── src/
│   ├── app.ts              # Express app setup
│   │
│   ├── routes/             # API endpoints
│   │   ├── auth.ts
│   │   ├── lessons.ts
│   │   ├── voice.ts
│   │   ├── quiz.ts
│   │   └── analytics.ts
│   │
│   ├── controllers/        # Business logic
│   │   ├── authController.ts
│   │   ├── lessonController.ts
│   │   ├── voiceController.ts
│   │   ├── quizController.ts
│   │   └── analyticsController.ts
│   │
│   ├── services/           # Domain logic
│   │   ├── authService.ts
│   │   ├── lessonService.ts
│   │   ├── aiService.ts
│   │   ├── pronunciationService.ts
│   │   └── analyticsService.ts
│   │
│   ├── models/             # Database schemas
│   │   ├── User.ts
│   │   ├── Lesson.ts
│   │   ├── Progress.ts
│   │   ├── Quiz.ts
│   │   └── VoiceSession.ts
│   │
│   ├── middleware/         # Request middleware
│   │   ├── auth.ts         # JWT verification
│   │   ├── errorHandler.ts # Error handling
│   │   ├── validation.ts   # Input validation
│   │   └── rateLimit.ts    # Rate limiting
│   │
│   ├── websocket/          # Real-time handlers
│   │   ├── voiceGateway.ts
│   │   └── handlers.ts
│   │
│   ├── utils/              # Helper functions
│   │   ├── logger.ts
│   │   ├── jwt.ts
│   │   └── validators.ts
│   │
│   ├── config/             # Configuration
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── ai.ts
│   │
│   └── types/              # TypeScript interfaces
│       ├── user.ts
│       ├── lesson.ts
│       └── api.ts
│
├── prisma/                 # Database schema
│   └── schema.prisma
│
├── tests/                  # Test files
├── tsconfig.json
├── package.json
└── Dockerfile
```

### Request/Response Flow
```
Request → Middleware (Auth, Validation) → Route → Controller → Service → Database
                                                       ↓
                                                   Logging
                                                       ↓
Response ← Error Handler ← Controller Response
```

---

## Data Flow

### Lesson Learning Flow
```
1. User selects lesson
   ↓
2. Fetch lesson from cache/DB
   ↓
3. Display lesson content
   ↓
4. User completes lesson
   ↓
5. Calculate mastery score
   ↓
6. Update user progress
   ↓
7. Update analytics
   ↓
8. Trigger recommendations
```

### Voice Tutor Flow
```
1. User speaks
   ↓
2. WebSocket transmits audio chunks
   ↓
3. Backend processes audio (speech-to-text)
   ↓
4. AI generates response (GPT API)
   ↓
5. Convert response to speech (TTS)
   ↓
6. Stream response audio back
   ↓
7. Log interaction for analytics
```

### Quiz Flow
```
1. Fetch quiz questions
   ↓
2. Display questions progressively
   ↓
3. Validate answers in real-time
   ↓
4. Calculate score
   ↓
5. Provide feedback
   ↓
6. Update mastery score
   ↓
7. Generate recommendations
```

---

## Database Design

### Schema Overview
- **Users**: User accounts and profiles
- **Lessons**: Learning content
- **UserProgress**: Tracking lesson completion
- **Quiz**: Quiz metadata
- **QuizQuestions**: Individual questions
- **VoiceSessions**: Voice interaction logs
- **Analytics**: Aggregated user metrics

### Indexes
- User email (unique)
- Lesson subject + difficulty
- Progress user + lesson (unique)
- Analytics mastery score
- Quiz submissions score + date

---

## Caching Strategy

### Redis Cache Layers
```
Level 1: Session Cache (5 min)
├── User sessions
├── Auth tokens
└── Temporary data

Level 2: Content Cache (1 hour)
├── Lessons
├── Quizzes
└── Subject data

Level 3: Analytics Cache (6 hours)
├── User progress
├── Mastery scores
└── Rankings
```

### Cache Invalidation
```
On lesson completion:
  - Invalidate user progress cache
  - Invalidate analytics cache
  - Invalidate recommendation cache

On quiz submission:
  - Invalidate user scores
  - Invalidate mastery cache
```

---

## Security Architecture

### Authentication
- JWT tokens with 7-day expiration
- Refresh token rotation
- Secure httpOnly cookies
- CORS validation

### Authorization
- Role-based access control (RBAC)
- Middleware-level enforcement
- Resource ownership validation

### Data Protection
- Password hashing (bcryptjs)
- HTTPS/TLS encryption
- SQL injection prevention (Prisma)
- XSS protection (Next.js)
- CSRF tokens

### API Security
- Rate limiting (100 req/15 min)
- Input validation (Joi)
- Output encoding
- Security headers (Helmet)

---

## Scalability Architecture

### Horizontal Scaling
```
┌─────────────────────────────┐
│   Load Balancer (nginx)     │
└──────────┬──────────────────┘
     │
┌────┼────┬────────────┐
│    │    │            │
▼    ▼    ▼            ▼
API1 API2 API3 ... API-N
│    │    │            │
└────┼────┼────────────┘
     │    │
     ▼    ▼
   Redis  PostgreSQL
   Cluster Replica Set
```

### Database Scaling
- Read replicas for analytics
- Connection pooling
- Query optimization
- Sharding for massive data

### Caching Strategy
- Redis for session/content
- CloudFlare for static assets
- CDN for media files

---

## Monitoring & Observability

### Logging
- Structured logging (Pino)
- Log levels: debug, info, warn, error
- Centralized log collection (ELK Stack)

### Metrics
- Request duration
- Error rates
- Cache hit/miss ratio
- Database query times
- API latency

### Alerting
- High error rates
- Slow queries
- Cache failures
- Memory usage

---

## Deployment Strategy

### Environments
```
Development → Staging → Production
   Local        AWS         AWS/GCP
   Docker    Docker/K8s   K8s Cluster
```

### CI/CD Pipeline
```
Push → Test → Build → Deploy → Monitor
             ↑              ↑
          Coverage        Health Check
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| API Response | < 100ms |
| Database Query | < 50ms |
| Voice Latency | < 200ms |
| 99.9% Uptime | Target |

---

For detailed implementation, refer to individual service documentation.
```

Architecture documentation created.