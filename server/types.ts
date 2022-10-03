export interface QuizInfo {
  uuid: string,
  name: string,
  createdAt: string,
  updatedAt?: string
}

export interface QuizQuestion {
  question: string
  answer: string
  pictureName?: string
}