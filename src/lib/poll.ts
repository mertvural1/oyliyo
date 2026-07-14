import { customAlphabet } from 'nanoid'
import { ref, set } from 'firebase/database'
import { database } from './firebase'
import type { Choice, Poll } from '../types/poll'

const createRoomCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 7)

export const createChoice = (): Choice => ({
  id: crypto.randomUUID(),
  text: '',
  votes: 0,
})

const toBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value)
  const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('')

  return btoa(binary)
}

const fromBase64 = (value: string) => {
  const binary = atob(value)
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}

export const createPoll = async (poll: Poll) => {
  const code = createRoomCode()

  await set(ref(database, `polls/${code}`), poll)

  return code
}

export const createShareUrl = (code: string) => {
  return `${window.location.origin}/sonuc/${code}`
}

export const getRoomFromUrl = (): { code: string; poll: Poll | null } => {
  const code = window.location.pathname.match(/^\/sonuc\/([A-Z0-9]{7})$/)?.[1] ?? ''
  const payload = new URLSearchParams(window.location.search).get('p')

  if (!code || !payload) return { code, poll: null }

  try {
    return { code, poll: JSON.parse(fromBase64(payload)) as Poll }
  } catch {
    return { code, poll: null }
  }
}
