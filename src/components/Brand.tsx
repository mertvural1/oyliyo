import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import logo from '../assets/logo.png'

export const Logo = () => <a className="inline-flex items-center gap-1.5 text-xl font-extrabold tracking-[-.07em] text-[#5b2cff]" href="/">
  <span className="grid size-9 -top-1 relative shrink-0 place-items-center overflow-hidden rounded-xl bg-white shadow-[2px_2px_0_#542cff]"><img className="size-11 max-w-none object-contain" src={logo} alt="Oyliyo logosu" /></span>
  Oyliyo
</a>

export const ThemeButton = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('oyliyo:theme')
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches

    setIsDark(shouldUseDark)
    document.documentElement.classList.toggle('dark', shouldUseDark)
  }, [])

  const toggleTheme = () => {
    const nextTheme = !isDark
    setIsDark(nextTheme)
    localStorage.setItem('oyliyo:theme', nextTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', nextTheme)
  }

  return <button className="grid size-9 place-items-center rounded-xl bg-white text-[#101132] shadow-[0_5px_14px_rgba(65,40,130,.12)] transition hover:-translate-y-0.5" onClick={toggleTheme} aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}>{isDark ? <Sun size={17} /> : <Moon size={17} fill="currentColor" />}</button>
}

export const Aurora = () => <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
  <i className="absolute -bottom-20 -left-20 block size-48 rounded-full bg-[#ddd3ff] opacity-70 blur-2xl" />
  <i className="absolute -right-20 -top-24 block size-48 rounded-full bg-[#ffdff0] opacity-60 blur-2xl" />
</div>

export const Eyebrow = ({ children }: { children: ReactNode }) => <span className="text-xxs font-bold tracking-[.04em] text-[#8582a8]">{children}</span>
