import { onValue, ref, runTransaction } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database, ensureAnonymousAuth } from '../lib/firebase'
import type { Poll } from '../types/poll'

export const useRealtimePoll = (roomCode: string, initialPoll: Poll | null) => {
  const [poll, setPoll] = useState<Poll | null>(initialPoll)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let unsubscribe = () => {}
    let isMounted = true

    ensureAnonymousAuth()
      .then(() => {
        if (!isMounted) return

        const pollRef = ref(database, `polls/${roomCode}`)
        unsubscribe = onValue(pollRef, snapshot => {
          setPoll(snapshot.val() as Poll | null)
          setLoaded(true)
        }, () => {
          if (isMounted) setLoaded(true)
        })
      })
      .catch(() => {
        if (isMounted) setLoaded(true)
      })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [roomCode])

  const vote = async (choiceId: string, previousChoiceId?: string) => {
    await ensureAnonymousAuth()

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
