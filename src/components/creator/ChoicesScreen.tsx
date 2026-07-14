import { ArrowLeft, Plus, Share2, Trash2 } from 'lucide-react'
import type { ChoicesScreenProps } from '../../types/creator'
import { Eyebrow } from '../Brand'

export const ChoicesScreen = ({ choices, onUpdate, onAdd, onRemove, onBack, onPublish, publishing = false }: ChoicesScreenProps) => <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-500">
  <button className="inline-flex size-10 items-center justify-center rounded-xl bg-white text-[#262448] shadow-[0_5px_15px_rgba(60,45,120,.1)] transition hover:-translate-x-0.5" onClick={onBack} aria-label="Geri dön"><ArrowLeft size={18} /></button>
  <div className="-mt-9 text-center"><Eyebrow>2 / 3　<span className="text-[#542cff]">● ●</span> ●</Eyebrow><h1 className="mt-5 text-4xl font-extrabold tracking-[-.055em] sm:text-5xl">Cevap seçeneklerini <em className="not-italic text-[#5b2cff]">ekle.</em></h1><p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#777595]">İstediğin kadar seçenek oluşturabilirsin.</p></div>
  <div className="mx-auto mt-8 grid max-w-150 gap-2.5">
    {choices.map((choice, index) => <div className="flex min-h-14 items-center rounded-2xl bg-white py-2 pl-5 pr-2 shadow-[0_5px_18px_rgba(66,47,135,.09)] transition focus-within:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#7548ff]" key={choice.id}>
      <input className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#161634] outline-none placeholder:font-normal placeholder:text-[#aaa7bb]" value={choice.text} onChange={event => onUpdate(choice.id, event.target.value)} placeholder={`Cevap seçeneği ${index + 1}`} autoFocus={index === 0} />
      <button className="rounded-xl p-2 text-[#9592af] transition hover:bg-[#fff0f4] hover:text-[#e5517c]" aria-label="Şıkkı sil" onClick={() => onRemove(choice.id)}><Trash2 size={16} /></button>
    </div>)}
    <button className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-dashed border-[#a98dff] bg-white/70 text-sm font-bold text-[#5b2cff] transition hover:bg-[#f2efff]" onClick={onAdd}><Plus size={18} /> Yeni seçenek ekle</button>
  </div>
  <button className="mx-auto mt-5 flex w-full max-w-150 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#6a35ff] to-[#5520e9] px-6 py-4 text-[15px] font-bold text-white shadow-[0_9px_18px_rgba(85,32,233,.24)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70" onClick={onPublish} disabled={publishing}>{publishing ? 'Yayınlanıyor...' : 'Devam'} <Share2 size={18} /></button><p className="mt-4 text-center text-xs text-[#9491ac]">• En az 2 seçenek olmalıdır</p>
</div>
