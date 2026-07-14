import { Copy, ExternalLink, Link2 } from 'lucide-react'
import type { ShareScreenProps } from '../../types/creator'
import { Eyebrow } from '../Brand'

export const ShareScreen = ({ question, choiceCount, url, onCopy, onEdit }: ShareScreenProps) => <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-500 text-center">
  <Eyebrow>3 / 3　<span className="text-[#542cff]">● ● ●</span></Eyebrow>
  <h1 className="mt-5 text-4xl font-extrabold tracking-[-.055em] sm:text-5xl">Anket hazır! <span>🎉</span></h1>
  <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#777595]">Linkini paylaş ve oyları toplamaya başla.</p>
  <article className="mt-7 rounded-2xl bg-white p-4 text-left shadow-[0_9px_28px_rgba(66,47,135,.12)] sm:p-5">
    <div><span className="block text-[10px] font-bold tracking-[.12em] text-[#9a97b1]">SORU</span><b className="mt-2 block text-lg leading-tight text-[#151532]">{question}</b><small className="mt-2 block text-xs text-[#85829d]">{choiceCount} seçenek · Anketin hazır</small></div>
    <div className="mt-5 flex items-center gap-2.5 rounded-xl bg-[#f6f5fb] p-2 pl-3.5 text-[#5b2cff]"><Link2 size={19} /><p className="min-w-0 flex-1 truncate text-[11px] font-bold text-[#55516d]">{url}</p><button className="rounded-lg bg-gradient-to-r from-[#6a35ff] to-[#5520e9] px-3 py-2 text-xs font-bold text-white" onClick={onCopy}>Kopyala</button><a className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#5b2cff] shadow-sm" href={url} target="_blank" rel="noreferrer">Git <ExternalLink className="ml-1 inline" size={13} /></a></div>
    <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#6a35ff] to-[#5520e9] px-6 py-4 text-[15px] font-bold text-white shadow-[0_9px_18px_rgba(85,32,233,.24)]" onClick={onCopy}>Paylaş <Copy size={18} /></button>
  </article>
  <button className="mt-6 rounded-xl bg-white px-6 py-3 text-[13px] font-bold text-[#3d3960] shadow-sm transition hover:text-[#5b2cff]" onClick={onEdit}>✎　Tekrar Düzenle</button>
</div>
