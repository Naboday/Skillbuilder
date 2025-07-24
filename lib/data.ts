// Mock data to replace Supabase database

export interface User {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
}

export interface Domain {
  id: number
  name: string
  description: string | null
  icon: string | null
}

export interface MasteryLevel {
  id: number
  name: string
  description: string | null
}

export interface Module {
  id: number
  domain_id: number
  mastery_level_id: number
  title: string
  description: string | null
  order_index: number
}

export interface Quiz {
  id: number
  module_id: number
  title: string
  quiz_questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: number
  quiz_id: number
  question: string
  order_index: number
  quiz_answers: QuizAnswer[]
}

export interface QuizAnswer {
  id: number
  question_id: number
  answer: string
  is_correct: boolean
}

export interface UserProgress {
  id: number
  user_id: string
  module_id: number
  is_completed: boolean
  completed_at: string | null
}

export interface UserQuizResult {
  id: number
  user_id: string
  quiz_id: number
  score: number
  completed_at: string
}

export interface ForumPost {
  id: number
  user_id: string
  title: string
  content: string
  domain_id: number | null
  upvotes: number
  downvotes: number
  created_at: string
  updated_at: string
}

export interface ForumComment {
  id: number
  post_id: number
  user_id: string
  content: string
  upvotes: number
  downvotes: number
  created_at: string
  updated_at: string
}

export interface UserVote {
  id: number
  user_id: string
  post_id: number | null
  comment_id: number | null
  vote_type: boolean
}

// Mock domains
export const domains: Domain[] = [
  {
    id: 1,
    name: "Web Development",
    description: "Learn frontend and backend web development",
    icon: null,
  },
  {
    id: 2,
    name: "Mobile Development",
    description: "Build mobile applications for iOS and Android",
    icon: null,
  },
  {
    id: 3,
    name: "Data Science",
    description: "Learn data analysis, visualization, and machine learning",
    icon: null,
  },
  {
    id: 4,
    name: "DevOps",
    description: "Master CI/CD, containerization, and cloud deployment",
    icon: null,
  },
]

// Mock mastery levels
export const masteryLevels: MasteryLevel[] = [
  {
    id: 1,
    name: "Beginner",
    description: "Fundamentals and basic concepts",
  },
  {
    id: 2,
    name: "Intermediate",
    description: "Advanced concepts and practical applications",
  },
  {
    id: 3,
    name: "Advanced",
    description: "Expert-level techniques and best practices",
  },
]

// Mock modules
export const modules: Module[] = [
  {
    id: 1,
    domain_id: 1,
    mastery_level_id: 1,
    title: "HTML Fundamentals",
    description: "Learn the basics of HTML markup language",
    order_index: 1,
  },
  {
    id: 2,
    domain_id: 1,
    mastery_level_id: 1,
    title: "CSS Basics",
    description: "Style your web pages with CSS",
    order_index: 2,
  },
  {
    id: 3,
    domain_id: 1,
    mastery_level_id: 1,
    title: "JavaScript Introduction",
    description: "Get started with JavaScript programming",
    order_index: 3,
  },
  {
    id: 4,
    domain_id: 1,
    mastery_level_id: 2,
    title: "React Fundamentals",
    description: "Build interactive UIs with React",
    order_index: 1,
  },
  {
    id: 5,
    domain_id: 2,
    mastery_level_id: 1,
    title: "Mobile App Basics",
    description: "Introduction to mobile app development",
    order_index: 1,
  },
  {
    id: 6,
    domain_id: 3,
    mastery_level_id: 1,
    title: "Python for Data Science",
    description: "Learn Python basics for data analysis",
    order_index: 1,
  },
  {
    id: 7,
    domain_id: 3,
    mastery_level_id: 1,
    title: "Data Visualization",
    description: "Create effective data visualizations",
    order_index: 2,
  },
  {
    id: 8,
    domain_id: 4,
    mastery_level_id: 1,
    title: "Docker Basics",
    description: "Introduction to containerization with Docker",
    order_index: 1,
  },
]

// Mock quizzes
export const quizzes: Quiz[] = [
  {
    id: 1,
    module_id: 1,
    title: "HTML Basics Quiz",
    quiz_questions: [
      {
        id: 1,
        quiz_id: 1,
        question: "What does HTML stand for?",
        order_index: 1,
        quiz_answers: [
          {
            id: 1,
            question_id: 1,
            answer: "Hyper Text Markup Language",
            is_correct: true,
          },
          {
            id: 2,
            question_id: 1,
            answer: "Hyper Transfer Markup Language",
            is_correct: false,
          },
          {
            id: 3,
            question_id: 1,
            answer: "Hyper Text Markdown Language",
            is_correct: false,
          },
          {
            id: 4,
            question_id: 1,
            answer: "High Tech Markup Language",
            is_correct: false,
          },
        ],
      },
      {
        id: 2,
        quiz_id: 1,
        question: "Which tag is used to create a hyperlink?",
        order_index: 2,
        quiz_answers: [
          {
            id: 5,
            question_id: 2,
            answer: "<a>",
            is_correct: true,
          },
          {
            id: 6,
            question_id: 2,
            answer: "<link>",
            is_correct: false,
          },
          {
            id: 7,
            question_id: 2,
            answer: "<href>",
            is_correct: false,
          },
          {
            id: 8,
            question_id: 2,
            answer: "<url>",
            is_correct: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    module_id: 2,
    title: "CSS Basics Quiz",
    quiz_questions: [
      {
        id: 3,
        quiz_id: 2,
        question: "Which property is used to change the text color?",
        order_index: 1,
        quiz_answers: [
          {
            id: 9,
            question_id: 3,
            answer: "color",
            is_correct: true,
          },
          {
            id: 10,
            question_id: 3,
            answer: "text-color",
            is_correct: false,
          },
          {
            id: 11,
            question_id: 3,
            answer: "font-color",
            is_correct: false,
          },
          {
            id: 12,
            question_id: 3,
            answer: "text-style",
            is_correct: false,
          },
        ],
      },
    ],
  },
]

// Mock user progress
export const userProgress: UserProgress[] = [
  {
    id: 1,
    user_id: "user-1",
    module_id: 1,
    is_completed: true,
    completed_at: "2023-06-15T10:30:00Z",
  },
  {
    id: 2,
    user_id: "user-1",
    module_id: 2,
    is_completed: true,
    completed_at: "2023-06-20T14:45:00Z",
  },
  {
    id: 3,
    user_id: "user-1",
    module_id: 3,
    is_completed: false,
    completed_at: null,
  },
  {
    id: 4,
    user_id: "user-1",
    module_id: 6,
    is_completed: true,
    completed_at: "2023-07-05T09:15:00Z",
  },
  {
    id: 5,
    user_id: "user-1",
    module_id: 7,
    is_completed: false,
    completed_at: null,
  },
]

// Mock quiz results
export const quizResults: UserQuizResult[] = [
  {
    id: 1,
    user_id: "user-1",
    quiz_id: 1,
    score: 85,
    completed_at: "2023-06-15T11:00:00Z",
  },
  {
    id: 2,
    user_id: "user-1",
    quiz_id: 2,
    score: 70,
    completed_at: "2023-06-20T15:30:00Z",
  },
]

// Mock forum posts
export const forumPosts: ForumPost[] = [
  {
    id: 1,
    user_id: "user-1",
    title: "How to center a div?",
    content: "I'm having trouble centering a div horizontally and vertically. Any tips?",
    domain_id: 1,
    upvotes: 5,
    downvotes: 0,
    created_at: "2023-06-10T09:15:00Z",
    updated_at: "2023-06-10T09:15:00Z",
  },
  {
    id: 2,
    user_id: "user-1",
    title: "Best practices for React state management",
    content: "What are the current best practices for managing state in a React application?",
    domain_id: 1,
    upvotes: 8,
    downvotes: 1,
    created_at: "2023-06-12T14:30:00Z",
    updated_at: "2023-06-12T14:30:00Z",
  },
]

// Mock forum comments
export const forumComments: ForumComment[] = [
  {
    id: 1,
    post_id: 1,
    user_id: "user-1",
    content: "You can use flexbox with justify-content: center and align-items: center.",
    upvotes: 3,
    downvotes: 0,
    created_at: "2023-06-10T10:20:00Z",
    updated_at: "2023-06-10T10:20:00Z",
  },
]

// Helper functions to simulate database operations

export function getDomainById(id: number): Domain | undefined {
  return domains.find((domain) => domain.id === id)
}

export function getMasteryLevelById(id: number): MasteryLevel | undefined {
  return masteryLevels.find((level) => level.id === id)
}

export function getModuleById(id: number): Module | undefined {
  return modules.find((module) => module.id === id)
}

export function getModulesByDomainAndLevel(domainId: number, levelId: number): Module[] {
  return modules.filter((module) => module.domain_id === domainId && module.mastery_level_id === levelId)
}

export function getQuizzesByModuleId(moduleId: number): Quiz[] {
  return quizzes.filter((quiz) => quiz.module_id === moduleId)
}

export function getUserProgressByModuleId(userId: string, moduleId: number): UserProgress | undefined {
  return userProgress.find((progress) => progress.module_id === moduleId && progress.user_id === userId)
}

export function getUserProgressByUserId(userId: string): UserProgress[] {
  return userProgress.filter((progress) => progress.user_id === userId)
}

export function getQuizResultsByUserId(userId: string): UserQuizResult[] {
  return quizResults.filter((result) => result.user_id === userId)
}

export function getCompletedModulesByDomain(userId: string): Record<number, { completed: number; total: number }> {
  const result: Record<number, { completed: number; total: number }> = {}

  // Initialize counts for each domain
  domains.forEach((domain) => {
    result[domain.id] = { completed: 0, total: 0 }
  })

  // Count total modules per domain
  modules.forEach((module) => {
    if (result[module.domain_id]) {
      result[module.domain_id].total++
    }
  })

  // Count completed modules per domain
  userProgress
    .filter((progress) => progress.user_id === userId && progress.is_completed)
    .forEach((progress) => {
      const module = modules.find((m) => m.id === progress.module_id)
      if (module && result[module.domain_id]) {
        result[module.domain_id].completed++
      }
    })

  return result
}

// Function to add a new domain
export function addDomain(name: string, description: string | null = null): Domain {
  const newId = Math.max(...domains.map((d) => d.id)) + 1
  const newDomain: Domain = {
    id: newId,
    name,
    description,
    icon: null,
  }

  domains.push(newDomain)
  return newDomain
}

// Function to update user progress
export function updateUserProgress(userId: string, moduleId: number, isCompleted: boolean): UserProgress {
  const existingProgress = userProgress.find((p) => p.module_id === moduleId && p.user_id === userId)

  if (existingProgress) {
    existingProgress.is_completed = isCompleted
    existingProgress.completed_at = isCompleted ? new Date().toISOString() : null
    return existingProgress
  } else {
    const newId = Math.max(...userProgress.map((p) => p.id)) + 1
    const newProgress: UserProgress = {
      id: newId,
      user_id: userId,
      module_id: moduleId,
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null,
    }
    userProgress.push(newProgress)
    return newProgress
  }
}

// Function to save quiz result
export function saveQuizResult(userId: string, quizId: number, score: number): UserQuizResult {
  const newId = Math.max(...quizResults.map((r) => r.id), 0) + 1
  const newResult: UserQuizResult = {
    id: newId,
    user_id: userId,
    quiz_id: quizId,
    score,
    completed_at: new Date().toISOString(),
  }

  quizResults.push(newResult)
  return newResult
}

// Get overall progress statistics for a user
export function getUserProgressStats(userId: string) {
  const userModulesProgress = getUserProgressByUserId(userId)
  const totalModules = modules.length
  const completedModules = userModulesProgress.filter((p) => p.is_completed).length
  const inProgressModules = userModulesProgress.filter((p) => !p.is_completed).length
  const notStartedModules = totalModules - completedModules - inProgressModules

  return {
    totalModules,
    completedModules,
    inProgressModules,
    notStartedModules,
    completionPercentage: Math.round((completedModules / totalModules) * 100),
  }
}
