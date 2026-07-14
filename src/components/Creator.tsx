import { useState } from 'react'
import toast from 'react-hot-toast'
import { createChoice, createPoll, createShareUrl } from '../lib/poll'
import type { Choice, Poll } from '../types/poll'
import type { Step } from '../types/creator'
import { Aurora, Logo, ThemeButton } from './Brand'
import { ChoicesScreen } from './creator/ChoicesScreen'
import { QuestionScreen } from './creator/QuestionScreen'
import { ShareScreen } from './creator/ShareScreen'
import { HeaderStats } from './HeaderStats'

const steps: Step[] = [1, 2, 3]

export const Creator = () => {
  const [step, setStep] = useState<Step>(1)
  const [question, setQuestion] = useState('')
  const [choices, setChoices] = useState<Choice[]>([createChoice(), createChoice()])
  const [shareUrl, setShareUrl] = useState('')
  const [publishing, setPublishing] = useState(false)
  const validChoices = choices.filter(choice => choice.text.trim())

  const goToChoices = () => {
    if (!question.trim()) return toast.error('Önce sorunu yazmalısın.')
    setStep(2)
  }

  const updateChoice = (id: string, text: string) => {
    setChoices(current => current.map(choice => choice.id === id ? { ...choice, text } : choice))
  }

  const removeChoice = (id: string) => {
    setChoices(current => current.length > 2 ? current.filter(choice => choice.id !== id) : current)
  }

  const publishPoll = async () => {
    if (publishing) return
    if (validChoices.length < 2) return toast.error('En az iki cevap şıkkı eklemelisin.')

    const poll: Poll = {
      question: question.trim(),
      choices: validChoices.map(choice => ({ ...choice, text: choice.text.trim(), votes: 0 })),
    }

    try {
      setPublishing(true)
      const code = await createPoll(poll)
      setShareUrl(createShareUrl(code))
      setStep(3)
    } catch {
      toast.error('Anket kaydedilemedi. Firebase ayarlarını ve kurallarını kontrol et.')
    } finally {
      setPublishing(false)
    }
  }

  const copyLink = async () => {
    await navigator.clipboard?.writeText(shareUrl)
    toast.success('Bağlantı kopyalandı!')
  }

  return <main className="relative min-h-svh overflow-hidden bg-[#fafaff] text-[#101132]">
    <Aurora />
    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
      <Logo />
      <div className="flex items-center gap-2">
        <HeaderStats />
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_6px_20px_rgba(62,47,130,.1)] sm:flex" aria-label={`Adım ${step} / 3`}>
          <b className="text-xs text-[#542cff]">{step} / 3</b>{steps.map(number => <span key={number} className={`size-2 rounded-full ${number === step ? 'bg-[#542cff] ring-4 ring-[#eeeaff]' : number < step ? 'bg-[#542cff]' : 'bg-[#d8d7e5]'}`} />)}
        </div>
        <div className="hidden sm:block"><ThemeButton /></div>
      </div>
    </header>
    <section className="relative z-10 grid min-h-[calc(100svh-100px)] place-items-center px-5 pb-14 sm:px-7">
      {step === 1 && <QuestionScreen question={question} onQuestionChange={setQuestion} onNext={goToChoices} />}
      {step === 2 && <ChoicesScreen choices={choices} onUpdate={updateChoice} onAdd={() => setChoices(current => [...current, createChoice()])} onRemove={removeChoice} onBack={() => setStep(1)} onPublish={publishPoll} publishing={publishing} />}
      {step === 3 && <ShareScreen question={question} choiceCount={validChoices.length} url={shareUrl} onCopy={copyLink} onEdit={() => setStep(2)} />}
    </section>
  </main>
}
