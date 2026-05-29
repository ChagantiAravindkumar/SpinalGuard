```typescript
'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LessonsPage() {
  const lessons = [
    {
      id: '1',
      title: 'Fractions Fundamentals',
      subject: 'Mathematics',
      difficulty: 'Beginner',
      duration: 15,
      mastery: 78,
      isCompleted: true,
    },
    {
      id: '2',
      title: 'Quadratic Equations',
      subject: 'Mathematics',
      difficulty: 'Intermediate',
      duration: 25,
      mastery: 0,
      isCompleted: false,
    },
    {
      id: '3',
      title: 'Photosynthesis',
      subject: 'Science',
      difficulty: 'Beginner',
      duration: 20,
      mastery: 65,
      isCompleted: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Lessons</h1>
        <p className="text-gray-400">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, i) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                {lesson.title}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200">
                {lesson.difficulty}
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-4">{lesson.subject}</p>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {lesson.duration} min
              </div>
            </div>

            {lesson.isCompleted && (
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400">Mastery</span>
                  <span className="text-purple-300 font-bold">{lesson.mastery}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lesson.mastery}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  />
                </div>
              </div>
            )}

            <Link
              href={`/dashboard/lessons/${lesson.id}`}
              className="block w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium text-center hover:opacity-90 transition-opacity"
            >
              {lesson.isCompleted ? 'Review' : 'Start'}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

Frontend lessons page created.