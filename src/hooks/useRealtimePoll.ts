import { onValue, ref, runTransaction } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../lib/firebase'
import type { Poll } from '../types/poll'

export const useRealtimePoll = (roomCode: string, initialPoll: Poll | null) => {
  const [poll, setPoll] = useState<Poll | null>(initialPoll)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const pollRef = ref(database, `polls/${roomCode}`)

    return onValue(pollRef, snapshot => {
      setPoll(snapshot.val() as Poll | null)
      setLoaded(true)
    }, () => setLoaded(true))
  }, [roomCode])

  const vote = async (choiceId: string, previousChoiceId?: string) => {
    const result = await runTransaction(ref(database, `polls/${roomCode}/choices`), current => {
      if (!Array.isArray(current)) return current

      return current.map(choice => {
        if (choice.id === choiceId) return { ...choice, votes: (choice.votes ?? 0) + 1 }
        if (choice.id === previousChoiceId) return { ...choice, votes: Math.max(0, (choice.votes ?? 0) - 1) }

        return choice
      })
    })

    if (!result.committed) throw new Error('Vote was not committed')
  }

  return { poll, loaded, vote }
}
