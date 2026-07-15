import type { ReactNode } from 'react'
import logo from '../assets/logo.png'

export const Logo = () => <a className="inline-flex items-center gap-1.5 text-xl font-extrabold tracking-[-.07em] text-[#5b2cff]" href="/">
  <span className="grid size-9 -top-1 relative shrink-0 place-items-center overflow-hidden rounded-xl bg-white shadow-[2px_2px_0_#542cff]"><img className="size-11 max-w-none object-contain" src={logo} alt="Oyliyo logosu" /></span>
  Oyliyo
</a>

export const Aurora = () => <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
  <div className="aurora-blob aurora-blob-1 absolute -bottom-24 -left-20 size-72 rounded-full opacity-80 blur-3xl" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98) 0%, rgba(216,224,255,0.94) 28%, rgba(108,88,255,0.55) 62%, rgba(63,27,179,0.3) 100%)' }} />
  <div className="aurora-blob aurora-blob-2 absolute -right-24 -top-24 size-80 rounded-full opacity-75 blur-3xl" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.98) 0%, rgba(255,229,241,0.95) 30%, rgba(255,120,180,0.5) 63%, rgba(175,68,255,0.3) 100%)' }} />
  <div className="aurora-blob aurora-blob-3 absolute left-[30%] top-[45%] size-[26rem] rounded-full opacity-70 blur-3xl" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.98) 0%, rgba(209,235,255,0.95) 36%, rgba(94,184,255,0.45) 68%, rgba(83,56,255,0.28) 100%)' }} />
  <div className="aurora-blob aurora-blob-4 absolute bottom-[12%] right-[10%] size-64 rounded-full opacity-60 blur-3xl" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,244,209,0.92) 35%, rgba(255,167,62,0.4) 100%)' }} />
</div>

export const Eyebrow = ({ children }: { children: ReactNode }) => <span className="text-xxs font-bold tracking-[.04em] text-[#8582a8]">{children}</span>
