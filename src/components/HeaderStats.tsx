import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database, ensureAnonymousAuth } from '../lib/firebase'
import type { Poll } from '../types/poll'
import { LoadingBadge } from './LoadingBadge'

type HeaderStatsState = {
  pollCount: number
  voteCount: number
  loaded: boolean
}

export const HeaderStats = () => {
  const [stats, setStats] = useState<HeaderStatsState>({
    pollCount: 0,
    voteCount: 0,
    loaded: false,
  })

  useEffect(() => {
    let unsubscribe = () => {}

    const loadStats = async () => {
      try {
        await ensureAnonymousAuth()

        const pollsRef = ref(database, 'polls')
        unsubscribe = onValue(pollsRef, snapshot => {
          const value = snapshot.val()

          if (!value || typeof value !== 'object') {
            setStats({ pollCount: 0, voteCount: 0, loaded: true })
            return
          }

          const polls = Object.values(value as Record<string, Poll>)
          const pollCount = polls.length
          const voteCount = polls.reduce((total, poll) => {
            const choices = Array.isArray(poll?.choices) ? poll.choices : []
            return total + choices.reduce((sum, choice) => sum + (choice.votes ?? 0), 0)
          }, 0)

          setStats({ pollCount, voteCount, loaded: true })
        }, () => {
          setStats(current => ({ ...current, loaded: true }))
        })
      } catch {
        setStats(current => ({ ...current, loaded: true }))
      }
    }

    void loadStats()

    return () => {
      unsubscribe()
    }
  }, [])

  if (!stats.loaded) {
    return <LoadingBadge />
  }

  return <div className="flex items-center gap-1">
    <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#542cff] shadow-[0_1px_3px_rgba(65,40,130,.08)] dark:text-[#542cff]">
      <span>📊</span>
      <span className="whitespace-nowrap">Toplam anket {stats.pollCount}</span>
    </div>
    <span className="h-1 w-1 rounded-full bg-[#d8d7e5]" />
    <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#6d6890] shadow-[0_1px_3px_rgba(65,40,130,.08)] dark:text-[#6d6890]">
      <span>🗳️</span>
      <span className="whitespace-nowrap">Toplam oy {stats.voteCount}</span>
    </div>
  </div>
}
