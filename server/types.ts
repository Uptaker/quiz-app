export interface QuizInfo {
  uuid: string,
  name: string,
  size: number,
  createdAt: number,
  updatedAt?: number
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

export interface UserAuth {
  username: string,
  password: string
}

export enum QuizSheetColumn {
  QUESTIONS = 'KÜSIMUSED', ANSWERS = 'VASTUSED', PICTURE = 'PILT', PICTURES = 'PILDID'
}