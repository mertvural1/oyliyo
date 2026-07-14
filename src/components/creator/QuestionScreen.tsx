import type { KeyboardEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import type { QuestionScreenProps } from '../../types/creator'

export const QuestionScreen = ({ question, onQuestionChange, onNext }: QuestionScreenProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onNext()
    }
  }

  return <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-500 text-center">
    <h1 className="text-[clamp(36px,6vw,52px)] font-extrabold leading-tight tracking-[-.06em]">Sorunu yaz.<br />Gerisini <em className="not-italic text-[#5b2cff]">Oyliyo.</em></h1>
    <div className="mt-10 flex items-center gap-3">
      <div className="flex-1 overflow-hidden rounded-2xl border-2 border-[#7548ff] bg-white text-left shadow-[0_16px_32px_rgba(84,44,255,.13)] transition focus-within:ring-4 focus-within:ring-[#dfd5ff]">
        <textarea autoFocus className="h-40 w-full resize-none bg-transparent px-5 pt-5 text-base font-medium text-[#101132] outline-none placeholder:font-normal placeholder:text-[#9d9ab7]" value={question} onChange={event => onQuestionChange(event.target.value)} onKeyDown={handleKeyDown} maxLength={200} placeholder={'Örneğin...\nBu akşam ne yiyelim?'} />
        <div className="flex justify-end px-5 pb-4 text-xs font-medium text-[#9996b1]"><span>{question.length} / 200</span></div>
      </div>
      <button className="min-h-20 grid w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#7449ff] to-[#4b1ce5] text-white shadow-[0_12px_22px_rgba(84,44,255,.28)] transition hover:-translate-y-1 sm:w-16" onClick={onNext} aria-label="Devam et"><ArrowRight size={28} /></button>
    </div>
    <p className="mt-4 text-xs text-[#9996b1] text-left">Enter tuşu ile devam edebilirsin</p>
  </div>
}
