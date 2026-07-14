import type { Choice, Poll } from './poll'

export type ResultPageProps = {
  poll: Poll | null
  roomCode: string
}

export type ResultCardProps = {
  choice: Choice
  totalVotes: number
  index: number
  color: {
    dot: string
    bar: string
  }
}
