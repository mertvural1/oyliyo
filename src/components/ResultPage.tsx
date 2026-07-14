import { Check } from 'lucide-react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useRealtimePoll } from '../hooks/useRealtimePoll'
import type { Choice } from '../types/poll'
import type { ResultCardProps, ResultPageProps } from '../types/result'
import { Aurora, Eyebrow, Logo, ThemeButton } from './Brand'
import { LoadingBadge } from './LoadingBadge'

const resultColors = [
  { dot: 'bg-[#6240f5]', bar: 'bg-[#6240f5]' },
  { dot: 'bg-[#ff9f18]', bar: 'bg-[#ff9f18]' },
  { dot: 'bg-[#2dcc7a]', bar: 'bg-[#2dcc7a]' },
  { dot: 'bg-[#27a8ff]', bar: 'bg-[#27a8ff]' },
]

export const ResultPage = ({ poll, roomCode }: ResultPageProps) => {
  const voteStorageKey = `oyliyo:vote:${roomCode}`
  const [selectedChoiceId, setSelectedChoiceId] = useState(() => localStorage.getItem(voteStorageKey))
  const { poll: livePoll, loaded, vote: submitVote } = useRealtimePoll(roomCode, poll)
  const choices = livePoll?.choices ?? []
  const totalVotes = useMemo(() => choices.reduce((sum, choice) => sum + choice.votes, 0), [choices])

  const vote = async (id: string) => {
    if (id === selectedChoiceId) return

    try {
      await submitVote(id, selectedChoiceId ?? undefined)
      const changedVote = Boolean(selectedChoiceId)
      localStorage.setItem(voteStorageKey, id)
      setSelectedChoiceId(id)
      toast.success(changedVote ? 'Oyun güncellendi!' : 'Oyun kaydedildi!')
    } catch {
      toast.error('Oyun kaydedilemedi. Lütfen tekrar dene.')
    }
  }

  if (!loaded) {
    return <main className="grid min-h-svh place-content-center bg-[#fafaff] p-8 text-[#101132]"><div className="flex flex-col items-center gap-4"><Logo /><LoadingBadge /></div></main>
  }

  if (loaded && !livePoll) return <main className="grid min-h-svh place-content-center justify-items-center gap-3 bg-[#fafaff] p-8 text-center text-[#101132]"><Logo /><h1 className="mt-7 text-5xl font-extrabold tracking-[-.06em]">Bu anketi bulamadık.</h1><p className="text-[#777595]">Bağlantı eksik veya geçersiz görünüyor.</p><a className="mt-4 rounded-xl bg-gradient-to-r from-[#6a35ff] to-[#5520e9] px-5 py-3 font-bold text-white" href="/">Yeni anket oluştur</a></main>

  return <main className="relative min-h-svh overflow-hidden bg-[#fafaff] pb-8 text-[#101132]"><Aurora />
    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10"><Logo /><ThemeButton /></header>
    <section className="relative z-10 mx-auto mt-6 w-[calc(100%-2rem)] max-w-265 sm:mt-11 sm:w-[calc(100%-3rem)]">
      <div className="mx-auto max-w-4xl text-center"><Eyebrow>OYLUYO ANKETİ</Eyebrow><h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-[-.06em] sm:text-6xl">{livePoll?.question}</h1><p className="mt-2 text-sm text-[#777595]">{selectedChoiceId ? 'Seçimin kaydedildi. Dilediğin zaman değiştirebilirsin.' : 'Lütfen bir seçenek seç.'}</p></div>
      <div className="mt-8 grid items-start gap-5 lg:mt-10 lg:grid-cols-[.94fr_1.06fr]">
        <section className="grid gap-2.5 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(66,47,135,.1)] sm:p-5">{choices.map(choice => <button className={`flex items-center gap-3 rounded-xl border p-3 text-left font-bold text-[#161634] shadow-sm transition hover:border-[#7b58ff] hover:bg-white ${choice.id === selectedChoiceId ? 'border-[#7b58ff] bg-white' : 'border-transparent bg-[#fafaff]'}`} key={choice.id} onClick={() => vote(choice.id)}>{choice.text}<span className="ml-auto text-lg font-normal text-[#7a5aff]">›</span>{choice.id === selectedChoiceId && <Check className="text-[#5b2cff]" size={18} />}</button>)}</section>
        <section className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(66,47,135,.1)] sm:p-6"><div className="text-center"><h2 className="text-3xl font-extrabold tracking-[-.055em]">Sonuçlar</h2><p className="mt-2 text-xs text-[#9996b1]">Toplam Oy</p><b className="text-2xl text-[#5b2cff]">{totalVotes}</b></div><div className="mt-5 grid gap-2.5">{choices.map((choice, index) => <ResultCard key={choice.id} choice={choice} totalVotes={totalVotes} color={resultColors[index % resultColors.length]} index={index} />)}</div></section>
      </div>
      <p className="mt-6 text-center text-xs text-[#9996b1]">● Gerçek zamanlı olarak güncellenir.　 ODA KODU · {roomCode}</p>
    </section>
  </main>
}

const ResultCard = ({ choice, totalVotes, color }: ResultCardProps) => {
  const percentage = totalVotes ? Math.round((choice.votes / totalVotes) * 100) : 0

  return <article className="rounded-xl bg-[#fafaff] p-3.5"><div className="flex items-center gap-2"><b className="flex-1 text-[13px]">{choice.text}</b><strong className="text-[13px] font-extrabold">{percentage}%</strong></div><div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#ecebf4]"><i className={`block h-full rounded-full transition-[width] duration-400 ${color.bar}`} style={{ width: `${percentage}%` }} /></div><small className="mt-1.5 block text-right text-[10px] text-[#817d9a]">{choice.votes} oy</small></article>
}
