export type Choice = {
  id: string
  text: string
  votes: number
}

export type Poll = {
  question: string
  choices: Choice[]
}
