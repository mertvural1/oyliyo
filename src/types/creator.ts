import type { Choice } from './poll'

export type Step = 1 | 2 | 3

export type QuestionScreenProps = {
  question: string
  onQuestionChange: (value: string) => void
  onNext: () => void
}

export type ChoicesScreenProps = {
  choices: Choice[]
  onUpdate: (id: string, text: string) => void
  onAdd: () => void
  onRemove: (id: string) => void
  onBack: () => void
  onPublish: () => void
  publishing?: boolean
}

export type ShareScreenProps = {
  question: string
  choiceCount: number
  url: string
  onCopy: () => void
  onEdit: () => void
}
