export interface QuizInfo {
  uuid: string,
  name: string,
  createdAt: string,
  updatedAt?: string
}

export interface QuizQuestion {
  question: string
  answer: string
  studentAnswer?: string
  pictureName?: string
}

export interface Quiz {
  info: QuizInfo
  questions: QuizQuestion[]
}